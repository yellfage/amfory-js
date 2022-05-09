import type { Inquiry, InquiryItems } from '../../inquiry'

import type { Payload } from '../../payload'

import type { ReplyBodyReader } from '../../reply'

import type {
  InquiringEventChannel,
  ReplyingEventChannel,
  RetryingEventChannel,
} from '../event'

export interface InquiryFactory {
  create<TResult>(
    method: string,
    url: URL,
    headers: Headers,
    payload: Payload,
    abortController: AbortController,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult>
}
