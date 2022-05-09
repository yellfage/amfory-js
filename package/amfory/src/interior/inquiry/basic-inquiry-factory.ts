import type { Inquiry, InquiryItems } from '../../inquiry'

import type { Logger } from '../../logging'

import type { SerializedPayload } from '../../payload'

import type { ReplyBodyReader } from '../../reply'

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

import { BasicInquiry } from './basic-inquiry'

import type { InquiryFactory } from './inquiry-factory'

export class BasicInquiryFactory implements InquiryFactory {
  private readonly replyFactory: ReplyFactory

  private readonly retryControl: RetryControl

  private readonly retryDelayScheme: RetryDelayScheme

  private readonly inquiringEventFactory: InquiringEventFactory

  private readonly retryingEventFactory: RetryingEventFactory

  private readonly replyingEventFactory: ReplyingEventFactory

  private readonly logger: Logger

  public constructor(
    replyFactory: ReplyFactory,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
    inquiringEventFactory: InquiringEventFactory,
    retryingEventFactory: RetryingEventFactory,
    replyingEventFactory: ReplyingEventFactory,
    logger: Logger,
  ) {
    this.replyFactory = replyFactory
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
    this.inquiringEventFactory = inquiringEventFactory
    this.retryingEventFactory = retryingEventFactory
    this.replyingEventFactory = replyingEventFactory
    this.logger = logger
  }

  public create<TResult>(
    method: string,
    url: URL,
    headers: Headers,
    payload: SerializedPayload,
    abortController: AbortController,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult> {
    return new BasicInquiry(
      method,
      url,
      headers,
      payload,
      abortController,
      items,
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
      rejectionDelay,
      attemptRejectionDelay,
      replyBodyReader,
      this.replyFactory,
      this.retryControl,
      this.retryDelayScheme,
      this.inquiringEventFactory,
      this.replyingEventFactory,
      this.retryingEventFactory,
      this.logger,
    )
  }
}
