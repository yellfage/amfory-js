import type { Reply } from '../../reply'

import type { InquiryEvent } from '../inquiry-event'

export interface ReplyingEvent<TResult = unknown>
  extends InquiryEvent<TResult> {
  readonly reply: Reply<TResult>

  resend(): Promise<void>
}
