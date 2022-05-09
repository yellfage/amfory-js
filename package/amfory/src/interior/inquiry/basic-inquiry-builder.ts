import type { InquiryBuilder, InquiryItems } from '../../inquiry'

import type { Payload } from '../../payload'

import type { InquiryPluginBuilder } from '../../plugin'

import type { Reply, ReplyBodyReader } from '../../reply'

import type { URLSearchParamsInit } from '../../url-search-params-init'

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

import type {
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
} from '../reply'

import type { InquiryFactory } from './inquiry-factory'

export class BasicInquiryBuilder implements InquiryBuilder {
  private readonly method: string

  private readonly url: URL

  private readonly headers: Headers

  private payload: Payload

  private abortController: AbortController

  private readonly items: InquiryItems

  private readonly inquiringEventChannel: InquiringEventChannel

  private readonly replyingEventChannel: ReplyingEventChannel

  private readonly retryingEventChannel: RetryingEventChannel

  private rejectionDelay: number

  private attemptRejectionDelay: number

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

  private readonly pluginBuilders: InquiryPluginBuilder[] = []

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
    this.method = method
    this.url = url
    this.headers = headers
    this.payload = payload
    this.abortController = abortController
    this.items = items
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
    this.factory = factory
  }

  public use(builder: InquiryPluginBuilder): this {
    this.pluginBuilders.push(builder)

    return this
  }

  public putParams(init: URLSearchParamsInit): this {
    new URLSearchParams(init).forEach((value, name) =>
      this.url.searchParams.set(name, value),
    )

    return this
  }

  public joinParams(init: URLSearchParamsInit): this {
    new URLSearchParams(init).forEach((value, name) =>
      this.url.searchParams.append(name, value),
    )

    return this
  }

  public putHeaders(init: HeadersInit): this {
    new Headers(init).forEach((value, name) => this.headers.set(name, value))

    return this
  }

  public joinHeaders(init: HeadersInit): this {
    new Headers(init).forEach((value, name) => this.headers.append(name, value))

    return this
  }

  public setRejectionDelay(delay: number): this {
    this.rejectionDelay = delay

    return this
  }

  public setAttemptRejectionDelay(delay: number): this {
    this.attemptRejectionDelay = delay

    return this
  }

  public setAbortController(controller: AbortController): this {
    this.abortController = controller

    return this
  }

  public setArrayBufferPayload(value: ArrayBuffer | ArrayBufferView): this {
    return this.setPayload(this.arrayBufferPayloadFactory.create(value))
  }

  public setBlobPayload(value: Blob): this {
    return this.setPayload(this.blobPayloadFactory.create(value))
  }

  public setFormDataPayload(value: FormData): this {
    return this.setPayload(this.formDataPayloadFactory.create(value))
  }

  public setJsonPayload<TValue = unknown>(value: TValue): this {
    return this.setPayload(this.jsonPayloadFactory.create(value))
  }

  public setTextPayload(value: string | number): this {
    return this.setPayload(this.textPayloadFactory.create(value))
  }

  public setPayload(payload: Payload): this {
    this.payload = payload

    return this
  }

  public fetchArrayBuffer(): Promise<Reply<ArrayBuffer>> {
    return this.fetch(this.replyBodyArrayBufferReader)
  }

  public fetchBlob(): Promise<Reply<Blob>> {
    return this.fetch(this.replyBodyBlobReader)
  }

  public fetchFormData(): Promise<Reply<FormData>> {
    return this.fetch(this.replyBodyFormDataReader)
  }

  public fetchJson<TResult>(): Promise<Reply<TResult>> {
    return this.fetch<TResult>(this.replyBodyJsonReader)
  }

  public fetchText(): Promise<Reply<string>> {
    return this.fetch(this.replyBodyTextReader)
  }

  public async fetch<TResult>(
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Promise<Reply<TResult>> {
    const inquiry = this.factory.create(
      this.method,
      this.url,
      this.headers,
      await this.payload.serialize(this.headers),
      this.abortController,
      this.items,
      this.inquiringEventChannel,
      this.replyingEventChannel,
      this.retryingEventChannel,
      this.rejectionDelay,
      this.attemptRejectionDelay,
      replyBodyReader,
    )

    this.pluginBuilders
      .map((builder) => builder.build())
      .forEach((plugin) => plugin.initialize(inquiry))

    return inquiry.perform()
  }
}
