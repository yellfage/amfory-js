import type { HttpMethod } from './http-method'

import type { RequestOptions } from './request-options'

export interface RequestSetup<TPayload = unknown> extends RequestOptions {
  url: string
  method: HttpMethod
  payload?: TPayload
}
