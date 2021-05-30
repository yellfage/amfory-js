import { RequestShape } from './request-shape'
import { RequestRetryContext } from './request-retry-context'

export type RequestRetryEvent<TPayload = any> = {
  readonly shape: RequestShape<TPayload>
  readonly context: RequestRetryContext
}
