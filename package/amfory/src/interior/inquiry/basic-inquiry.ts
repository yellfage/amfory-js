import delay from 'delay'

import { AbortError } from '../../abort-error'

import type { Inquiry, InquiryItems } from '../../inquiry'

import type { Logger } from '../../logging'

import type { Payload } from '../../payload'

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
  public readonly method: string

  public readonly url: URL

  public readonly headers: Headers

  public readonly payload: Payload

  public readonly abortController: AbortController

  public readonly items: InquiryItems

  public readonly inquiring: InquiringEventChannel

  public readonly replying: ReplyingEventChannel

  public readonly retrying: RetryingEventChannel

  private readonly rejectionDelay: number

  private readonly attemptRejectionDelay: number

  private readonly replyBodyReader: ReplyBodyReader<TResult>

  private readonly replyFactory: ReplyFactory

  private readonly retryControl: RetryControl

  private readonly retryDelayScheme: RetryDelayScheme

  private readonly inquiringEventFactory: InquiringEventFactory

  private readonly replyingEventFactory: ReplyingEventFactory

  private readonly retryingEventFactory: RetryingEventFactory

  private readonly logger: Logger

  private state = InquiryState.None

  private rejectionTimeoutId = 0

  private attemptRejectionTimeoutId = 0

  public constructor(
    method: string,
    url: URL,
    headers: Headers,
    payload: Payload,
    abortController: AbortController,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    replyBodyReader: ReplyBodyReader<TResult>,
    replyFactory: ReplyFactory,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
    inquiringEventFactory: InquiringEventFactory,
    replyingEventFactory: ReplyingEventFactory,
    retryingEventFactory: RetryingEventFactory,
    logger: Logger,
  ) {
    this.method = method
    this.url = url
    this.headers = headers
    this.payload = payload
    this.abortController = abortController
    this.items = items
    this.inquiring = inquiringEventChannel
    this.replying = replyingEventChannel
    this.retrying = retryingEventChannel
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.replyBodyReader = replyBodyReader
    this.replyFactory = replyFactory
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
    this.inquiringEventFactory = inquiringEventFactory
    this.replyingEventFactory = replyingEventFactory
    this.retryingEventFactory = retryingEventFactory
    this.logger = logger
  }

  public async perform(): Promise<Reply<TResult>> {
    this.ensureAbortControllerValid()

    this.ensureSendingPossible()

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
      this.stopRejectionTimeout()

      this.retryDelayScheme.reset()
    }
  }

  private async performAttempt(): Promise<Reply<TResult>> {
    try {
      this.state = InquiryState.Sending

      this.runAttemptRejectionTimeout()

      const response = await fetch(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: this.payload.serialize(this.headers),
        signal: this.abortController.signal,
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
      if (this.abortController.signal.aborted) {
        throw new AbortError('Inquiry aborted')
      }

      if (this.retryControl.confirmError(error)) {
        this.logger.logError(error)

        // eslint-disable-next-line @typescript-eslint/return-await
        return this.performRetry()
      }

      throw error
    } finally {
      this.stopAttemptRejectionTimeout()
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
        signal: this.abortController.signal,
      })
    } catch (error: unknown) {
      if (this.abortController.signal.aborted) {
        throw new AbortError('Inquiry aborted while waiting for retry')
      }

      throw error
    }

    return this.performAttempt()
  }

  private runRejectionTimeout(): void {
    if (this.rejectionDelay <= 0) {
      return
    }

    this.rejectionTimeoutId = setTimeout(() => {
      this.abortController.abort()
    }, this.rejectionDelay) as unknown as number
  }

  private runAttemptRejectionTimeout(): void {
    if (this.attemptRejectionDelay <= 0) {
      return
    }

    this.attemptRejectionTimeoutId = setTimeout(() => {
      this.abortController.abort()
    }, this.attemptRejectionDelay) as unknown as number
  }

  private stopRejectionTimeout(): void {
    clearTimeout(this.rejectionTimeoutId)
  }

  private stopAttemptRejectionTimeout(): void {
    clearTimeout(this.attemptRejectionTimeoutId)
  }

  private ensureAbortControllerValid(): void {
    if (this.abortController.signal.aborted) {
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
}
