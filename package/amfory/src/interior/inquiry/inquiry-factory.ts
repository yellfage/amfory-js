import type { Inquiry, InquiryItems, InquiryShape } from '../../inquiry'

import type { ReplyBodyReader } from '../../reply'

import type {
  InquiringEventChannel,
  ReplyingEventChannel,
  RetryingEventChannel,
} from '../event'

export interface InquiryFactory {
  create<TResult>(
    shape: InquiryShape,
    items: InquiryItems,
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult>
}
