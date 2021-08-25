import { RequestEvent } from './request-event'
import { RequestResultEvent } from './request-result-event'
import { RequestRetryEvent } from './request-retry-event'

export type Events = {
  request: (event: RequestEvent) => any
  result: (event: RequestResultEvent) => any
  retry: (event: RequestRetryEvent) => any
}
