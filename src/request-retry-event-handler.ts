import { RequestRetryEvent } from './request-retry-event'

export type RequestRetryEventHandler = (event: RequestRetryEvent) => any
