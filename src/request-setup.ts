import { HttpMethod } from './http-method'
import { RequestOptions } from './request-options'

export interface RequestSetup<TPayload = any> extends RequestOptions {
  url: string
  method: HttpMethod
  payload?: TPayload
}
