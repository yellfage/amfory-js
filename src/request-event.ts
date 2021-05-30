import { RequestShape } from './request-shape'

export type RequestEvent<TPayload = any> = {
  readonly shape: RequestShape<TPayload>
}
