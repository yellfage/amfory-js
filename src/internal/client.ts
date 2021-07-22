/* eslint-disable node/no-callback-literal */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-named-as-default */

import AbortController from 'abort-controller'
import delay from 'delay'

import { IClient } from '../i-client'
import { ILogger } from '../i-logger'
import { Callback } from './callback'
import { EventHandlerStore } from './event-handler-store'
import { RequestEventHandler } from '../request-event-handler'
import { RequestCompletionEventHandler } from '../request-completion-event-handler'
import { RequestRetryEventHandler } from '../request-retry-event-handler'
import { RequestOptions } from '../request-options'
import { RequestResult } from '../request-result'
import { RequestSettings } from '../settings'
import { RequestDescriptor } from './request-descriptor'
import { RequestSetup } from '../request-setup'
import { RequestShape } from '../request-shape'

import { ObjectHelper } from './object-helper'

import { RequestAbortedError } from '../request-aborted-error'
import { FailedRequestError } from '../failed-request-error'
import { RequestContext } from './request-context'

export class Client implements IClient {
  public readonly request: EventHandlerStore<RequestEventHandler>
  public readonly requestCompletion: EventHandlerStore<RequestCompletionEventHandler>
  public readonly requestRetry: EventHandlerStore<RequestRetryEventHandler>

  private readonly requestSettings: RequestSettings

  private readonly logger: ILogger

  public constructor(requestSettings: RequestSettings, logger: ILogger) {
    this.request = new EventHandlerStore()
    this.requestCompletion = new EventHandlerStore()
    this.requestRetry = new EventHandlerStore()

    this.requestSettings = requestSettings

    this.logger = logger
  }

  public async get(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'GET', ...options })
  }

  public async head(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'HEAD', ...options })
  }

  public async post(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'POST', payload, ...options })
  }

  public async put(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'PUT', payload, ...options })
  }

  public async delete(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'DELETE', payload, ...options })
  }

  public async patch(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return await this.send({ url, method: 'PATCH', payload, ...options })
  }

  // TODO: validate setup
  public async send(setup: RequestSetup): Promise<RequestResult> {
    if (setup.abortController?.signal.aborted) {
      throw new RequestAbortedError()
    }

    return await this.sendCore(this.createRequestShape(setup))
  }

  private async sendCore(shape: RequestShape): Promise<RequestResult> {
    const descriptor = this.createRequestDescriptor(shape)

    this.registerRequestAbortionHandler(descriptor)
    this.runRequestRejectionTimeout(descriptor)

    await this.emitRequestEvent(descriptor.shape)

    try {
      const response = await this.performRequest(descriptor)

      const result = await this.createRequestResult(response)

      await this.emitRequestCompletionEvent(result, shape)

      if (!shape.confirmResolve(result)) {
        throw new FailedRequestError(result)
      }

      return result
    } finally {
      descriptor.shape.retryPolicy.reset()

      this.clearRequestRejectionTimeout(descriptor.context)
      this.unregisterRequestAbortionHandler(descriptor)
    }
  }

  private async performRequest(
    descriptor: RequestDescriptor
  ): Promise<Response> {
    try {
      const url = descriptor.shape.url.toString()

      const requestInit = this.createRequestInit(descriptor)

      this.runRequestAttemptRejectionTimeout(descriptor)

      const response = await fetch(url, requestInit)

      if (
        descriptor.shape.retryPolicy.confirmRetry(response.status) &&
        !descriptor.shape.retryPolicy.isMaxRetriesReached()
      ) {
        return this.retryRequest(descriptor)
      }

      return response
    } catch {
      if (
        descriptor.shape.abortController.signal.aborted ||
        descriptor.shape.retryPolicy.isMaxRetriesReached()
      ) {
        throw new RequestAbortedError()
      }

      if (descriptor.context.attemptAbortController.signal.aborted) {
        descriptor.context.attemptAbortController = new AbortController()
      }

      return this.retryRequest(descriptor)
    } finally {
      this.clearRequestAttemptRejectionTimeout(descriptor.context)
    }
  }

  private async retryRequest(descriptor: RequestDescriptor): Promise<Response> {
    const retryDelay = descriptor.shape.retryPolicy.getNextRetryDelay()

    await this.emitRequestRetryEvent(descriptor.shape, retryDelay)

    if (Number.isNaN(retryDelay) || retryDelay <= 0) {
      return this.performRequest(descriptor)
    }

    try {
      await delay(retryDelay, {
        signal: descriptor.shape.abortController.signal
      })
    } catch {
      throw new RequestAbortedError()
    }

    return this.performRequest(descriptor)
  }

  private readResponseBody(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      return response.json()
    } else if (contentType?.includes('text/')) {
      return response.text()
    } else if (contentType?.includes('multipart/form-data')) {
      return response.formData()
    } else {
      return response.blob()
    }
  }

  private registerRequestAbortionHandler(descriptor: RequestDescriptor): void {
    descriptor.context.abortionHandler = () => {
      descriptor.context.attemptAbortController.abort()
    }

    descriptor.shape.abortController.signal.addEventListener(
      'abort',
      descriptor.context.abortionHandler
    )
  }

  private unregisterRequestAbortionHandler(
    descriptor: RequestDescriptor
  ): void {
    descriptor.shape.abortController.signal.removeEventListener(
      'abort',
      descriptor.context.abortionHandler
    )
  }

  private runRequestRejectionTimeout(descriptor: RequestDescriptor): void {
    const { rejectionDelay } = descriptor.shape

    if (Number.isNaN(rejectionDelay) || rejectionDelay <= 0) {
      return
    }

    descriptor.context.rejectionTimeoutId = setTimeout(
      () => descriptor.shape.abortController.abort(),
      rejectionDelay
    ) as unknown as number
  }

  private runRequestAttemptRejectionTimeout(
    descriptor: RequestDescriptor
  ): void {
    const { attemptRejectionDelay } = descriptor.shape

    if (Number.isNaN(attemptRejectionDelay) || attemptRejectionDelay <= 0) {
      return
    }

    descriptor.context.attemptRejectionTimeoutId = setTimeout(
      () => descriptor.context.attemptAbortController.abort(),
      attemptRejectionDelay
    ) as unknown as number
  }

  private clearRequestRejectionTimeout(context: RequestContext): void {
    clearTimeout(context.rejectionTimeoutId)
  }

  private clearRequestAttemptRejectionTimeout(context: RequestContext): void {
    clearTimeout(context.attemptRejectionTimeoutId)
  }

  private serializeRequestPayload(shape: RequestShape): any {
    if (ObjectHelper.isPlainObject(shape.payload)) {
      shape.headers.set('Content-Type', 'application/json;charset=UTF-8')

      return JSON.stringify(shape.payload)
    }

    return shape.payload
  }

  private populateHeaders(target: Headers, headers: Headers): void {
    headers.forEach((value, name) => target.append(name, value))
  }

  private populateSearchParams(
    target: URLSearchParams,
    params: URLSearchParams
  ): void {
    params.forEach((value, name) => target.append(name, value))
  }

  private createRequestShape(setup: RequestSetup): RequestShape {
    const {
      url: rawUrl,
      method,
      payload,
      baseUrl = this.requestSettings.baseUrl,
      paramsInit,
      headersInit,
      rejectionDelay = this.requestSettings.rejectionDelay,
      attemptRejectionDelay = this.requestSettings.attemptRejectionDelay,
      retryPolicy = this.requestSettings.retryPolicy,
      abortController = new AbortController(),
      confirmResolve = this.requestSettings.confirmResolve
    } = setup

    const url = new URL(rawUrl, baseUrl || undefined) // Replace an empty baseUrl to prevent throwing errors

    const headers = new Headers(this.requestSettings.headersInit)

    this.populateHeaders(headers, new Headers(headersInit))
    this.populateSearchParams(url.searchParams, new URLSearchParams(paramsInit))

    return {
      url,
      method,
      headers,
      payload,
      rejectionDelay,
      attemptRejectionDelay,
      retryPolicy,
      abortController,
      confirmResolve
    }
  }

  private createRequestContext(): RequestContext {
    return {
      attemptAbortController: new AbortController(),
      rejectionTimeoutId: 0,
      attemptRejectionTimeoutId: 0,
      abortionHandler: () => {
        throw new Error('An abortion handler cannot be called manually')
      }
    }
  }

  private createRequestDescriptor(shape: RequestShape): RequestDescriptor {
    return { shape, context: this.createRequestContext() }
  }

  private createRequestInit(descriptor: RequestDescriptor): RequestInit {
    return {
      method: descriptor.shape.method,
      headers: descriptor.shape.headers,
      body: this.serializeRequestPayload(descriptor.shape),
      signal: descriptor.context.attemptAbortController.signal
    }
  }

  private async createRequestResult(
    response: Response
  ): Promise<RequestResult> {
    return {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      payload: await this.readResponseBody(response)
    }
  }

  private async emitRequestEvent(shape: RequestShape): Promise<void> {
    if (!this.request.handlers.length) {
      return
    }

    await this.promisfyCallbacks(this.request.handlers, { shape })
  }

  private async emitRequestCompletionEvent(
    result: RequestResult,
    shape: RequestShape
  ): Promise<void> {
    if (!this.requestCompletion.handlers.length) {
      return
    }

    await this.promisfyCallbacks(this.requestCompletion.handlers, {
      result,
      shape
    })
  }

  private async emitRequestRetryEvent(
    shape: RequestShape,
    delay: number
  ): Promise<void> {
    if (!this.requestCompletion.handlers.length) {
      return
    }

    await this.promisfyCallbacks(this.requestRetry.handlers, {
      shape,
      context: { delay }
    })
  }

  private promisfyCallbacks<TCallback extends Callback>(
    callbacks: TCallback[],
    ...args: Parameters<TCallback>
  ): Promise<any[]> {
    return Promise.all(
      callbacks.map((callback) => Promise.resolve(callback(...args)))
    )
  }
}
