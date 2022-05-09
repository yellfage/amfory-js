import type {
  InquiringEventPool,
  ReplyingEventPool,
  RetryingEventPool,
} from '../event'

import type { SerializedPayload } from '../payload'

import type { Reply } from '../reply'

import type { InquiryItems } from './inquiry-items'

export interface Inquiry<TResult = unknown> {
  readonly method: string
  readonly url: URL
  readonly headers: Headers
  readonly payload: SerializedPayload
  readonly abortController: AbortController

  readonly items: InquiryItems

  readonly inquiring: InquiringEventPool
  readonly replying: ReplyingEventPool
  readonly retrying: RetryingEventPool

  perform(): Promise<Reply<TResult>>
}
