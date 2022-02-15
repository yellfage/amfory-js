import type { EventEmitter } from '@yellfage/event-emitter'

import { nanoid } from 'nanoid'

import type { EventHandlerMap } from '../../event-handler-map'

import type { InquiryBuilder } from '../../inquiry'

import type { PluginBuilder } from '../../plugin'

import type {
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
} from '../reply'

import type { ArrayBufferInquiryPayloadFactory } from './array-buffer-inquiry-payload-factory'

import { BasicInquiryBuilder } from './basic-inquiry-builder'

import { BasicInquiryItems } from './basic-inquiry-items'

import type { BlobInquiryPayloadFactory } from './blob-inquiry-payload-factory'

import { EmptyInquiryPayload } from './empty-inquiry-payload'

import type { FormDataInquiryPayloadFactory } from './form-data-inquiry-payload-factory'

import type { InquiryBuilderFactory } from './inquiry-builder-factory'

import type { InquiryFactory } from './inquiry-factory'

import type { InquiryShapeFactory } from './inquiry-shape-factory'

import type { JsonInquiryPayloadFactory } from './json-inquiry-payload-factory'

import type { TextInquiryPayloadFactory } from './text-inquiry-payload-factory'

export class BasicInquiryBuilderFactory implements InquiryBuilderFactory {
  private readonly baseUrl: URL

  private readonly baseHeaders: Headers

  private readonly baseRejectionDelay: number

  private readonly baseAttemptRejectionDelay: number

  private readonly basePluginBuilders: PluginBuilder[]

  private readonly baseEventEmitter: EventEmitter<EventHandlerMap>

  private readonly arrayBufferPayloadFactory: ArrayBufferInquiryPayloadFactory

  private readonly blobPayloadFactory: BlobInquiryPayloadFactory

  private readonly formDataPayloadFactory: FormDataInquiryPayloadFactory

  private readonly jsonPayloadFactory: JsonInquiryPayloadFactory

  private readonly textPayloadFactory: TextInquiryPayloadFactory

  private readonly replyBodyArrayBufferReader: ReplyBodyArrayBufferReader

  private readonly replyBodyBlobReader: ReplyBodyBlobReader

  private readonly replyBodyFormDataReader: ReplyBodyFormDataReader

  private readonly replyBodyJsonReader: ReplyBodyJsonReader

  private readonly replyBodyTextReader: ReplyBodyTextReader

  private readonly shapeFactory: InquiryShapeFactory

  private readonly factory: InquiryFactory

  public constructor(
    baseUrl: URL,
    baseHeaders: Headers,
    baseRejectionDelay: number,
    baseAttemptRejectionDelay: number,
    basePluginBuilders: PluginBuilder[],
    baseEventEmitter: EventEmitter<EventHandlerMap>,
    arrayBufferPayloadFactory: ArrayBufferInquiryPayloadFactory,
    blobPayloadFactory: BlobInquiryPayloadFactory,
    formDataPayloadFactory: FormDataInquiryPayloadFactory,
    jsonPayloadFactory: JsonInquiryPayloadFactory,
    textPayloadFactory: TextInquiryPayloadFactory,
    replyBodyArrayBufferReader: ReplyBodyArrayBufferReader,
    replyBodyBlobReader: ReplyBodyBlobReader,
    replyBodyFormDataReader: ReplyBodyFormDataReader,
    replyBodyJsonReader: ReplyBodyJsonReader,
    replyBodyTextReader: ReplyBodyTextReader,
    shapeFactory: InquiryShapeFactory,
    factory: InquiryFactory,
  ) {
    this.baseUrl = baseUrl
    this.baseHeaders = baseHeaders
    this.baseRejectionDelay = baseRejectionDelay
    this.baseAttemptRejectionDelay = baseAttemptRejectionDelay
    this.basePluginBuilders = basePluginBuilders
    this.baseEventEmitter = baseEventEmitter
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
    this.shapeFactory = shapeFactory
    this.factory = factory
  }

  public create(method: string): InquiryBuilder {
    return new BasicInquiryBuilder(
      nanoid(),
      method,
      new URL(this.baseUrl),
      new Headers(this.baseHeaders),
      new EmptyInquiryPayload(),
      this.baseRejectionDelay,
      this.baseAttemptRejectionDelay,
      new AbortController(),
      new BasicInquiryItems(),
      [...this.basePluginBuilders],
      this.baseEventEmitter.clone(),
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
      this.shapeFactory,
      this.factory,
    )
  }
}
