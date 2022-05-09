import type {
  InquiringEventPool,
  ReplyingEventPool,
  RetryingEventPool,
} from '../event'

import type { Reply } from '../reply'

import type { InquiryItems } from './inquiry-items'

import type { InquirySerializedPayload } from './payload'

export interface Inquiry<TResult = unknown> {
  readonly method: string
  readonly url: URL
  readonly headers: Headers
  readonly payload: InquirySerializedPayload
  readonly abortController: AbortController

  readonly items: InquiryItems

  readonly inquiring: InquiringEventPool
  readonly replying: ReplyingEventPool
  readonly retrying: RetryingEventPool

  send(): Promise<Reply<TResult>>
}
