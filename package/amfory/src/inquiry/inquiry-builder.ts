import type { Payload } from '../payload'

import type { InquiryPluginBuilder } from '../plugin'

import type { Reply, ReplyBodyReader } from '../reply'

import type { URLSearchParamsInit } from '../url-search-params-init'

export interface InquiryBuilder {
  use(builder: InquiryPluginBuilder): this

  putParams(init: URLSearchParamsInit): this
  joinParams(init: URLSearchParamsInit): this
  putHeaders(init: HeadersInit): this
  joinHeaders(init: HeadersInit): this
  setRejectionDelay(delay: number): this
  setAttemptRejectionDelay(delay: number): this
  setAbortController(controller: AbortController): this

  setArrayBufferPayload(value: ArrayBuffer | ArrayBufferView): this
  setBlobPayload(value: Blob): this
  setFormDataPayload(value: FormData): this
  setJsonPayload<TValue = unknown>(value: TValue): this
  setTextPayload(value: string | number, charset?: string): this
  setPayload(payload: Payload): this

  fetchArrayBuffer(): Promise<Reply<ArrayBuffer>>
  fetchBlob(): Promise<Reply<Blob>>
  fetchFormData(): Promise<Reply<FormData>>
  fetchJson<TResult>(): Promise<Reply<TResult>>
  fetchText(): Promise<Reply<string>>
  fetch<TResult>(
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Promise<Reply<TResult>>
}
