import type { EventEmitter } from '@yellfage/event-emitter'

import type { EventHandlerMap } from '../../event-handler-map'

import type { InquiryShape, Inquiry, InquiryItems } from '../../inquiry'

import type { Logger } from '../../logging'

import type { ReplyBodyReader } from '../../reply'

import type { RetryControl, RetryDelayScheme } from '../../retry'

import type {
  InquiryEventFactory,
  ReplyEventFactory,
  RetryEventFactory,
} from '../event'

import type { ReplyFactory } from '../reply'

import type { RetryContextFactory } from '../retry'

import { BasicInquiry } from './basic-inquiry'

import type { InquiryFactory } from './inquiry-factory'

export class BasicInquiryFactory implements InquiryFactory {
  private readonly replyFactory: ReplyFactory

  private readonly retryControl: RetryControl

  private readonly retryDelayScheme: RetryDelayScheme

  private readonly inquiryEventFactory: InquiryEventFactory

  private readonly retryEventFactory: RetryEventFactory

  private readonly retryContextFactory: RetryContextFactory

  private readonly replyEventFactory: ReplyEventFactory

  private readonly logger: Logger

  public constructor(
    replyFactory: ReplyFactory,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
    inquiryEventFactory: InquiryEventFactory,
    retryEventFactory: RetryEventFactory,
    retryContextFactory: RetryContextFactory,
    replyEventFactory: ReplyEventFactory,
    logger: Logger,
  ) {
    this.replyFactory = replyFactory
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
    this.inquiryEventFactory = inquiryEventFactory
    this.retryEventFactory = retryEventFactory
    this.retryContextFactory = retryContextFactory
    this.replyEventFactory = replyEventFactory
    this.logger = logger
  }

  public create<TResult>(
    id: string,
    shape: InquiryShape,
    items: InquiryItems,
    eventEmitter: EventEmitter<EventHandlerMap>,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult> {
    return new BasicInquiry(
      id,
      shape,
      items,
      eventEmitter,
      replyBodyReader,
      this.replyFactory,
      this.retryControl,
      this.retryDelayScheme,
      this.inquiryEventFactory,
      this.retryEventFactory,
      this.retryContextFactory,
      this.replyEventFactory,
      this.logger,
    )
  }
}
