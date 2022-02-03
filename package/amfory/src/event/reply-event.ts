import type { Inquiry } from '../inquiry'

import type { Reply } from '../reply'

export interface ReplyEvent<TReplyData = unknown> {
  readonly inquiry: Inquiry
  readonly reply: Reply<TReplyData>

  resend(): Promise<void>
}
