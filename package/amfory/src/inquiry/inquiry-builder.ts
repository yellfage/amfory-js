import type { EventHandlerMap } from '../event-handler-map'

import type { PluginBuilder } from '../plugin'

import type { Reply, ReplyBodyReader } from '../reply'

import type { InquiryPayload } from './inquiry-payload'

export interface InquiryBuilder {
  use(builder: PluginBuilder): this

  on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): this
  off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): this

  setPath(path: string): this
  addParams(params: Record<string, string | number>): this
  addHeaders(headers: Record<string, string | number>): this
  setRejectionDelay(delay: number): this
  setAttemptRejectionDelay(delay: number): this
  setAbortController(controller: AbortController): this

  setArrayBufferPayload(value: ArrayBuffer | ArrayBufferView): this
  setBlobPayload(value: Blob): this
  setFormDataPayload(value: FormData): this
  setJsonPayload<TValue = unknown>(value: TValue): this
  setTextPayload(value: string | number, charset?: string): this
  setPayload(payload: InquiryPayload): this

  fetchArrayBuffer(): Promise<Reply<ArrayBuffer>>
  fetchBlob(): Promise<Reply<Blob>>
  fetchFormData(): Promise<Reply<FormData>>
  fetchJson<TResult>(): Promise<Reply<TResult>>
  fetchText(): Promise<Reply<string>>
  fetch<TResult>(
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Promise<Reply<TResult>>
}
