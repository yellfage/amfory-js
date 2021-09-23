import delay from 'delay'

import { AbortError } from '../abort-error'

import type { EventHandlerMap } from '../event-handler-map'

import { FailedRequestError } from '../failed-request-error'

import type { Logger } from '../logging'

import type { RequestResult } from '../request-result'

import type { RequestShape } from '../request-shape'

import type { EventEmitter } from './event-emitter'

import { isNumber } from './is-number'

import { isPlainObject } from './is-plain-object'

export class Request {
  private readonly shape: RequestShape

  private readonly logger: Logger

  private readonly eventEmitter: EventEmitter<EventHandlerMap>

  private attemptAbortController: AbortController

  private rejectionTimeoutId: number

  private attemptRejectionTimeoutId: number

  private retries: number

  public constructor(
    shape: RequestShape,
    logger: Logger,
    eventEmitter: EventEmitter<EventHandlerMap>
  ) {
    this.shape = shape
    this.logger = logger
    this.eventEmitter = eventEmitter
    this.attemptAbortController = new AbortController()
    this.rejectionTimeoutId = 0
    this.attemptRejectionTimeoutId = 0
    this.retries = 0
  }

  public async perform<TResult>(): Promise<RequestResult<TResult>> {
    if (this.shape.abortController.signal.aborted) {
      throw new Error(
        'Unable to perform the request: the provided AbortController is already aborted'
      )
    }

    this.registerAbortionHandler()

    this.runRejectionTimeout()

    await this.eventEmitter.emit('request', { shape: this.shape })

    try {
      const result = await this.performAttempt<TResult>()

      await this.eventEmitter.emit('result', { shape: this.shape, result })

      if (!this.shape.confirmResolve(result)) {
        throw new FailedRequestError(result)
      }

      return result
    } finally {
      this.clearRejectionTimeout()

      this.unregisterAbortionHandler()

      this.shape.retryPolicy.reset()
    }
  }

  private async performAttempt<TResult>(): Promise<RequestResult<TResult>> {
    try {
      this.runAttemptRejectionTimeout()

      const response = await fetch(this.shape.url.toString(), {
        method: this.shape.method,
        headers: this.shape.headers,
        body: this.serializePayload() as string,
        signal: this.attemptAbortController.signal
      })

      if (this.shape.retryPolicy.confirmStatus(response.status)) {
        return await this.performRetry<TResult>()
      }

      return {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        data: (await this.readResponseBody(response)) as TResult
      }
    } catch (error: unknown) {
      if (this.shape.abortController.signal.aborted) {
        throw new AbortError()
      }

      if (!this.shape.retryPolicy.confirm()) {
        throw error
      }

      if (this.attemptAbortController.signal.aborted) {
        this.attemptAbortController = new AbortController()
      } else {
        this.logger.logError(error)
      }

      return await this.performRetry()
    } finally {
      this.clearAttemptRejectionTimeout()
    }
  }

  private async performRetry<TResult>(): Promise<RequestResult<TResult>> {
    this.retries += 1

    const retryDelay = this.shape.retryPolicy.getNextDelay(this.retries)

    if (!isNumber(retryDelay) || Number.isNaN(retryDelay)) {
      throw new Error(
        `Unable to retry request: invalid retry delay "${retryDelay}"`
      )
    }

    await this.eventEmitter.emit('retry', {
      shape: this.shape,
      context: { delay: retryDelay, retries: this.retries }
    })

    if (retryDelay <= 0) {
      return this.performAttempt()
    }

    try {
      await delay(retryDelay, {
        signal: this.shape.abortController.signal
      })
    } catch {
      throw new AbortError()
    }

    return this.performAttempt()
  }

  private serializePayload(): unknown {
    if (
      isPlainObject(this.shape.payload) ||
      Array.isArray(this.shape.payload)
    ) {
      this.shape.headers.set('content-type', 'application/json;charset=utf-8')

      return JSON.stringify(this.shape.payload)
    }

    return this.shape.payload
  }

  private async readResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      return response.json()
    }

    if (contentType?.includes('text/')) {
      return response.text()
    }

    if (contentType?.includes('multipart/form-data')) {
      return response.formData()
    }

    return response.blob()
  }

  private registerAbortionHandler(): void {
    this.shape.abortController.signal.addEventListener(
      'abort',
      this.handleAbortion
    )
  }

  private unregisterAbortionHandler(): void {
    this.shape.abortController.signal.removeEventListener(
      'abort',
      this.handleAbortion
    )
  }

  private runRejectionTimeout(): void {
    const { rejectionDelay } = this.shape

    if (rejectionDelay <= 0) {
      return
    }

    this.rejectionTimeoutId = setTimeout(() => {
      this.shape.abortController.abort()
    }, rejectionDelay) as unknown as number
  }

  private runAttemptRejectionTimeout(): void {
    const { attemptRejectionDelay } = this.shape

    if (attemptRejectionDelay <= 0) {
      return
    }

    this.attemptRejectionTimeoutId = setTimeout(() => {
      this.attemptAbortController.abort()
    }, attemptRejectionDelay) as unknown as number
  }

  private clearRejectionTimeout(): void {
    clearTimeout(this.rejectionTimeoutId)
  }

  private clearAttemptRejectionTimeout(): void {
    clearTimeout(this.attemptRejectionTimeoutId)
  }

  private readonly handleAbortion = (): void => {
    this.attemptAbortController.abort()
  }
}
