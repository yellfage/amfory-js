import type { EventEmitter } from '@yellfage/event-emitter'

import delay from 'delay'

import { AbortError } from '../../abort-error'

import type { EventHandlerMap } from '../../event-handler-map'

import type { Inquiry, InquiryItems, InquiryShape } from '../../inquiry'

import type { Logger } from '../../logging'

import type { Reply, ReplyBodyReader } from '../../reply'

import type { RetryControl, RetryDelayScheme } from '../../retry'

import type {
  InquiryEventFactory,
  ReplyEventFactory,
  RetryEventFactory,
} from '../event'

import type { ReplyFactory } from '../reply'

import type { RetryContextFactory } from '../retry'

import { InquiryState } from './inquiry-state'

export class BasicInquiry<TResult> implements Inquiry<TResult> {
  public readonly id: string

  public readonly shape: InquiryShape

  public readonly items: InquiryItems

  private readonly eventEmitter: EventEmitter<EventHandlerMap>

  private readonly replyBodyReader: ReplyBodyReader<TResult>

  private readonly replyFactory: ReplyFactory

  private readonly retryControl: RetryControl

  private readonly retryDelayScheme: RetryDelayScheme

  private readonly inquiryEventFactory: InquiryEventFactory

  private readonly retryEventFactory: RetryEventFactory

  private readonly retryContextFactory: RetryContextFactory

  private readonly replyEventFactory: ReplyEventFactory

  private readonly logger: Logger

  private state = InquiryState.None

  private attemptAbortController = new AbortController()

  private rejectionTimeoutId = 0

  private attemptRejectionTimeoutId = 0

  public constructor(
    id: string,
    shape: InquiryShape,
    items: InquiryItems,
    eventEmitter: EventEmitter<EventHandlerMap>,
    replyBodyReader: ReplyBodyReader<TResult>,
    replyFactory: ReplyFactory,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
    inquiryEventFactory: InquiryEventFactory,
    retryEventFactory: RetryEventFactory,
    retryContextFactory: RetryContextFactory,
    replyEventFactory: ReplyEventFactory,
    logger: Logger,
  ) {
    this.id = id
    this.shape = shape
    this.items = items
    this.eventEmitter = eventEmitter
    this.replyBodyReader = replyBodyReader
    this.replyFactory = replyFactory
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
    this.inquiryEventFactory = inquiryEventFactory
    this.retryEventFactory = retryEventFactory
    this.retryContextFactory = retryContextFactory
    this.replyEventFactory = replyEventFactory
    this.logger = logger
  }

  public on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): EventHandlerMap[TEventName] {
    return this.eventEmitter.on(eventName, handler)
  }

  public off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): void {
    this.eventEmitter.off(eventName, handler)
  }

  public async send(): Promise<Reply<TResult>> {
    this.ensureAbortControllerValid()

    this.ensureSendingPossible()

    this.registerAbortionHandler()

    this.runRejectionTimeout()

    this.state = InquiryState.Starting

    const inquiryEvent = this.inquiryEventFactory.create(this)

    await this.eventEmitter.emit('inquiry', inquiryEvent)

    try {
      const reply = await this.performAttempt()

      this.state = InquiryState.Replying

      const replyEvent = this.replyEventFactory.create<TResult>(this, reply)

      await this.eventEmitter.emit('reply', replyEvent)

      return replyEvent.reply
    } finally {
      this.clearRejectionTimeout()

      this.unregisterAbortionHandler()

      this.retryDelayScheme.reset()
    }
  }

  private async performAttempt(): Promise<Reply<TResult>> {
    try {
      this.state = InquiryState.Sending

      this.runAttemptRejectionTimeout()

      const response = await fetch(this.shape.url.toString(), {
        method: this.shape.method,
        headers: this.shape.headers,
        body: this.shape.payload,
        signal: this.attemptAbortController.signal,
      })

      if (!this.retryControl.confirmStatus(response.status)) {
        return this.replyFactory.create(
          response.headers,
          response.status,
          response.statusText,
          await this.replyBodyReader.read(response),
        )
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.performRetry()
    } catch (error: unknown) {
      if (this.shape.abortController.signal.aborted) {
        throw new AbortError('Inquiry aborted')
      }

      if (this.attemptAbortController.signal.aborted) {
        this.attemptAbortController = new AbortController()
      } else if (this.retryControl.confirmError(error)) {
        this.logger.logError(error)
      } else {
        throw error
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.performRetry()
    } finally {
      this.clearAttemptRejectionTimeout()
    }
  }

  private async performRetry(): Promise<Reply<TResult>> {
    this.state = InquiryState.Retrying

    const retryDelay = this.retryDelayScheme.moveNext()

    const context = this.retryContextFactory.create(retryDelay)

    const event = this.retryEventFactory.create(this, context)

    await this.eventEmitter.emit('retry', event)

    if (retryDelay <= 0) {
      return this.performAttempt()
    }

    this.logger.logDebug(`Retrying after: ${retryDelay}`)

    try {
      await delay(retryDelay, {
        signal: this.shape.abortController.signal,
      })
    } catch (error: unknown) {
      if (this.shape.abortController.signal.aborted) {
        throw new AbortError('Inquiry aborted while waiting for retry')
      }

      throw error
    }

    return this.performAttempt()
  }

  private registerAbortionHandler(): void {
    this.shape.abortController.signal.addEventListener(
      'abort',
      this.handleAbortion,
    )
  }

  private unregisterAbortionHandler(): void {
    this.shape.abortController.signal.removeEventListener(
      'abort',
      this.handleAbortion,
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

  private ensureAbortControllerValid(): void {
    if (this.shape.abortController.signal.aborted) {
      throw new Error('Provided AbortController is already aborted')
    }
  }

  private ensureSendingPossible(): void {
    if (
      this.state !== InquiryState.None &&
      this.state !== InquiryState.Replying
    ) {
      throw new Error(
        `Unable to send the inquiry in the current state: ${
          InquiryState[this.state]
        }`,
      )
    }
  }

  private readonly handleAbortion = (): void => {
    this.attemptAbortController.abort()
  }
}
