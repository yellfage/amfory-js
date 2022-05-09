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
  private readonly baseUrl: URL

  private readonly baseRejectionDelay: number

  private readonly baseAttemptRejectionDelay: number

  private readonly baseInquiringEventChannel: InquiringEventChannel

  private readonly baseReplyingEventChannel: ReplyingEventChannel

  private readonly baseRetryingEventChannel: RetryingEventChannel

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

  private readonly factory: InquiryFactory

  public constructor(
    baseUrl: URL,
    baseRejectionDelay: number,
    baseAttemptRejectionDelay: number,
    baseInquiringEventChannel: InquiringEventChannel,
    baseReplyingEventChannel: ReplyingEventChannel,
    baseRetryingEventChannel: RetryingEventChannel,
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
    factory: InquiryFactory,
  ) {
    this.baseUrl = baseUrl
    this.baseRejectionDelay = baseRejectionDelay
    this.baseAttemptRejectionDelay = baseAttemptRejectionDelay
    this.baseInquiringEventChannel = baseInquiringEventChannel
    this.baseReplyingEventChannel = baseReplyingEventChannel
    this.baseRetryingEventChannel = baseRetryingEventChannel
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
    this.factory = factory
  }

  public create(method: string, path: string): InquiryBuilder {
    return new BasicInquiryBuilder(
      method,
      new URL(path, this.baseUrl),
      new Headers(),
      new EmptyPayload(),
      this.baseRejectionDelay,
      this.baseAttemptRejectionDelay,
      new AbortController(),
      new BasicInquiryItems(),
      this.baseInquiringEventChannel.clone(),
      this.baseReplyingEventChannel.clone(),
      this.baseRetryingEventChannel.clone(),
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
      this.factory,
    )
  }
}
