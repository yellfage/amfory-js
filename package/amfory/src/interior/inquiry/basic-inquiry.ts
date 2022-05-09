import delay from 'delay'

import { AbortError } from '../../abort-error'

import type { Inquiry, InquiryItems, InquiryShape } from '../../inquiry'

import type { Logger } from '../../logging'

import type { Reply, ReplyBodyReader } from '../../reply'

import type { RetryControl, RetryDelayScheme } from '../../retry'

import type {
  InquiringEventChannel,
  InquiringEventFactory,
  ReplyingEventChannel,
  ReplyingEventFactory,
  RetryingEventChannel,
  RetryingEventFactory,
} from '../event'

import type { ReplyFactory } from '../reply'

import { InquiryState } from './inquiry-state'

export class BasicInquiry<TResult> implements Inquiry<TResult> {
  public readonly shape: InquiryShape

  public readonly items: InquiryItems

  public readonly inquiring: InquiringEventChannel

  public readonly replying: ReplyingEventChannel

  public readonly retrying: RetryingEventChannel

  private readonly replyBodyReader: ReplyBodyReader<TResult>

  private readonly replyFactory: ReplyFactory

  private readonly retryControl: RetryControl

  private readonly retryDelayScheme: RetryDelayScheme

  private readonly inquiringEventFactory: InquiringEventFactory

  private readonly replyingEventFactory: ReplyingEventFactory

  private readonly retryingEventFactory: RetryingEventFactory

  private readonly logger: Logger

  private state = InquiryState.None

  private attemptAbortController = new AbortController()

  private rejectionTimeoutId = 0

  private attemptRejectionTimeoutId = 0

  public constructor(
    shape: InquiryShape,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    replyBodyReader: ReplyBodyReader<TResult>,
    replyFactory: ReplyFactory,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
    inquiringEventFactory: InquiringEventFactory,
    replyingEventFactory: ReplyingEventFactory,
    retryingEventFactory: RetryingEventFactory,
    logger: Logger,
  ) {
    this.shape = shape
    this.items = items
    this.inquiring = inquiringEventChannel
    this.replying = replyingEventChannel
    this.retrying = retryingEventChannel
    this.replyBodyReader = replyBodyReader
    this.replyFactory = replyFactory
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
    this.inquiringEventFactory = inquiringEventFactory
    this.replyingEventFactory = replyingEventFactory
    this.retryingEventFactory = retryingEventFactory
    this.logger = logger
  }

  public async send(): Promise<Reply<TResult>> {
    this.ensureAbortControllerValid()

    this.ensureSendingPossible()

    this.registerAbortionHandler()

    this.runRejectionTimeout()

    this.state = InquiryState.Starting

    const inquiringEvent = this.inquiringEventFactory.create(this)

    await this.inquiring.emit(inquiringEvent)

    try {
      const reply = await this.performAttempt()

      this.state = InquiryState.Replying

      const replyingEvent = this.replyingEventFactory.create<TResult>(
        this,
        reply,
      )

      await this.replying.emit(replyingEvent)

      return replyingEvent.reply
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

    const event = this.retryingEventFactory.create(this, retryDelay)

    await this.retrying.emit(event)

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
