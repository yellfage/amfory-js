import { RequestSetup } from './request-setup'
import { RequestRetryContext } from './request-retry-context'

export type RequestRetryEvent<TPayload = any> = {
  readonly setup: RequestSetup<TPayload>
  readonly context: RequestRetryContext
}
