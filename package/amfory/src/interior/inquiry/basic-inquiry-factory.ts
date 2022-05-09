import type { InquiryShape, Inquiry, InquiryItems } from '../../inquiry'

import type { Logger } from '../../logging'

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
    shape: InquiryShape,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult> {
    return new BasicInquiry(
      shape,
      items,
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
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
