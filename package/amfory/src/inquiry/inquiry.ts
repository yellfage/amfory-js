import type {
  InquiringEventPool,
  ReplyingEventPool,
  RetryingEventPool,
} from '../event'

import type { Reply } from '../reply'

import type { InquiryItems } from './inquiry-items'

import type { InquiryShape } from './inquiry-shape'

export interface Inquiry<TResult = unknown> {
  readonly shape: InquiryShape
  readonly items: InquiryItems

  readonly inquiring: InquiringEventPool
  readonly replying: ReplyingEventPool
  readonly retrying: RetryingEventPool

  send(): Promise<Reply<TResult>>
}
