import { RequestShape } from './request-shape'
import { RequestRetryContext } from './request-retry-context'

export interface RequestRetryEvent {
  readonly shape: RequestShape
  readonly context: RequestRetryContext
}
