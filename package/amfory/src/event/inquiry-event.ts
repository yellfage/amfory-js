import type { Inquiry } from '../inquiry'

export interface InquiryEvent<TResult = unknown> {
  readonly target: Inquiry<TResult>
}
