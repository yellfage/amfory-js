import { HttpMethod } from './http-method'
import { RequestOptions } from './request-options'

export type RequestSetup<TPayload = any> = RequestOptions & {
  url: string
  method: HttpMethod
  payload?: TPayload
}
