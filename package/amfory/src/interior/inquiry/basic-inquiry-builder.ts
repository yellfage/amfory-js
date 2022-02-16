import type { EventEmitter } from '@yellfage/event-emitter'

import type { EventHandlerMap } from '../../event-handler-map'

import type {
  InquiryBuilder,
  InquiryItems,
  InquiryPayload,
} from '../../inquiry'

import type { PluginBuilder } from '../../plugin'

import type { Reply, ReplyBodyReader } from '../../reply'

import type { URLSearchParamsInit } from '../../url-search-params-init'

import type {
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
} from '../reply'

import type { ArrayBufferInquiryPayloadFactory } from './array-buffer-inquiry-payload-factory'

import type { BlobInquiryPayloadFactory } from './blob-inquiry-payload-factory'

import type { FormDataInquiryPayloadFactory } from './form-data-inquiry-payload-factory'

import type { InquiryFactory } from './inquiry-factory'

import type { InquiryShapeFactory } from './inquiry-shape-factory'

import type { JsonInquiryPayloadFactory } from './json-inquiry-payload-factory'

import type { TextInquiryPayloadFactory } from './text-inquiry-payload-factory'

export class BasicInquiryBuilder implements InquiryBuilder {
  private readonly method: string

  private readonly url: URL

  private readonly headers: Headers

  private payload: InquiryPayload

  private rejectionDelay: number

  private attemptRejectionDelay: number

  private abortController: AbortController

  private readonly items: InquiryItems

  private readonly pluginBuilders: PluginBuilder[]

  private readonly eventEmitter: EventEmitter<EventHandlerMap>

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
    method: string,
    url: URL,
    headers: Headers,
    payload: InquiryPayload,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    abortController: AbortController,
    items: InquiryItems,
    pluginBuilders: PluginBuilder[],
    eventEmitter: EventEmitter<EventHandlerMap>,
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
    this.method = method
    this.url = url
    this.headers = headers
    this.payload = payload
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.abortController = abortController
    this.items = items
    this.pluginBuilders = pluginBuilders
    this.eventEmitter = eventEmitter
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

  public use(builder: PluginBuilder): this {
    this.pluginBuilders.push(builder)

    return this
  }

  public on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): this {
    this.eventEmitter.on(eventName, handler)

    return this
  }

  public off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): this {
    this.eventEmitter.off(eventName, handler)

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

  public putHeaders(headers: Record<string, string | number>): this {
    for (const [name, value] of Object.entries(headers)) {
      this.headers.set(name, value.toString())
    }

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

  public setPayload(payload: InquiryPayload): this {
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
    const shape = this.shapeFactory.create(
      this.method,
      this.url,
      this.headers,
      await this.payload.serialize(this.headers),
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.abortController,
    )

    const inquiry = this.factory.create(
      shape,
      this.items,
      this.eventEmitter,
      replyBodyReader,
    )

    const plugins = this.pluginBuilders.map((builder) => builder.build(inquiry))

    await Promise.all(plugins.map((plugin) => plugin.initialize()))

    const reply = await inquiry.send()

    await Promise.all(plugins.map((plugin) => plugin.terminate()))

    return reply
  }
}
