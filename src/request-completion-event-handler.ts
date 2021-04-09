import { RequestCompletionEvent } from './request-completion-event'

export type RequestCompletionEventHandler = (
  event: RequestCompletionEvent
) => any
