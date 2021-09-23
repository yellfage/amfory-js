import type { RequestEvent } from './request-event'

import type { RequestResultEvent } from './request-result-event'

import type { RequestRetryEvent } from './request-retry-event'

export type EventHandlerMap = {
  request: (event: RequestEvent) => unknown
  result: (event: RequestResultEvent) => unknown
  retry: (event: RequestRetryEvent) => unknown
}
