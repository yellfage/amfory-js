import type { InquiryEvent } from '../inquiry-event'

export interface RetryingEvent<TResult = unknown>
  extends InquiryEvent<TResult> {
  readonly delay: number
}
