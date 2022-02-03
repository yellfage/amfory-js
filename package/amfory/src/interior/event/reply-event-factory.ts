import type { ReplyEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

export interface ReplyEventFactory {
  create<TReplyData>(
    inquiry: Inquiry<TReplyData>,
    reply: Reply<TReplyData>,
  ): ReplyEvent<TReplyData>
}
