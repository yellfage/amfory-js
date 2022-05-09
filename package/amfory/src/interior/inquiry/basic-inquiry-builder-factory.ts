import type { InquiryBuilder } from '../../inquiry'

import type {
  InquiringEventChannel,
  ReplyingEventChannel,
  RetryingEventChannel,
} from '../event'

import type {
  ArrayBufferPayloadFactory,
  BlobPayloadFactory,
  FormDataPayloadFactory,
  JsonPayloadFactory,
  TextPayloadFactory,
} from '../payload'

import { EmptyPayload } from '../payload'

import type {
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
} from '../reply'

import { BasicInquiryBuilder } from './basic-inquiry-builder'

import { BasicInquiryItems } from './basic-inquiry-items'

import type { InquiryBuilderFactory } from './inquiry-builder-factory'

import type { InquiryFactory } from './inquiry-factory'

export class BasicInquiryBuilderFactory implements InquiryBuilderFactory {
  private readonly url: URL

  private readonly inquiringEventChannel: InquiringEventChannel

  private readonly replyingEventChannel: ReplyingEventChannel

  private readonly retryingEventChannel: RetryingEventChannel

  private readonly rejectionDelay: number

  private readonly attemptRejectionDelay: number

  private readonly arrayBufferPayloadFactory: ArrayBufferPayloadFactory

  private readonly blobPayloadFactory: BlobPayloadFactory

  private readonly formDataPayloadFactory: FormDataPayloadFactory

  private readonly jsonPayloadFactory: JsonPayloadFactory

  private readonly textPayloadFactory: TextPayloadFactory

  private readonly replyBodyArrayBufferReader: ReplyBodyArrayBufferReader

  private readonly replyBodyBlobReader: ReplyBodyBlobReader

  private readonly replyBodyFormDataReader: ReplyBodyFormDataReader

  private readonly replyBodyJsonReader: ReplyBodyJsonReader

  private readonly replyBodyTextReader: ReplyBodyTextReader

  private readonly inquiryFactory: InquiryFactory

  public constructor(
    url: URL,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    arrayBufferPayloadFactory: ArrayBufferPayloadFactory,
    blobPayloadFactory: BlobPayloadFactory,
    formDataPayloadFactory: FormDataPayloadFactory,
    jsonPayloadFactory: JsonPayloadFactory,
    textPayloadFactory: TextPayloadFactory,
    replyBodyArrayBufferReader: ReplyBodyArrayBufferReader,
    replyBodyBlobReader: ReplyBodyBlobReader,
    replyBodyFormDataReader: ReplyBodyFormDataReader,
    replyBodyJsonReader: ReplyBodyJsonReader,
    replyBodyTextReader: ReplyBodyTextReader,
    inquiryFactory: InquiryFactory,
  ) {
    this.url = url
    this.inquiringEventChannel = inquiringEventChannel
    this.replyingEventChannel = replyingEventChannel
    this.retryingEventChannel = retryingEventChannel
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.arrayBufferPayloadFactory = arrayBufferPayloadFactory
    this.blobPayloadFactory = blobPayloadFactory
    this.formDataPayloadFactory = formDataPayloadFactory
    this.jsonPayloadFactory = jsonPayloadFactory
    this.textPayloadFactory = textPayloadFactory
    this.replyBodyArrayBufferReader = replyBodyArrayBufferReader
    this.replyBodyBlobReader = replyBodyBlobReader
    this.replyBodyFormDataReader = replyBodyFormDataReader
    this.replyBodyJsonReader = replyBodyJsonReader
    this.replyBodyTextReader = replyBodyTextReader
    this.inquiryFactory = inquiryFactory
  }

  public create(method: string, path: string): InquiryBuilder {
    return new BasicInquiryBuilder(
      method,
      new URL(path, this.url),
      new Headers(),
      new EmptyPayload(),
      new AbortController(),
      new BasicInquiryItems(),
      this.inquiringEventChannel.clone(),
      this.replyingEventChannel.clone(),
      this.retryingEventChannel.clone(),
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.arrayBufferPayloadFactory,
      this.blobPayloadFactory,
      this.formDataPayloadFactory,
      this.jsonPayloadFactory,
      this.textPayloadFactory,
      this.replyBodyArrayBufferReader,
      this.replyBodyBlobReader,
      this.replyBodyFormDataReader,
      this.replyBodyJsonReader,
      this.replyBodyTextReader,
      this.inquiryFactory,
    )
  }
}
