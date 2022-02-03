import type { ReplyEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

import { BasicReplyEvent } from './basic-reply-event'

import type { ReplyEventFactory } from './reply-event-factory'

export class BasicReplyEventFactory implements ReplyEventFactory {
  public create<TReplyData>(
    inquiry: Inquiry<TReplyData>,
    reply: Reply<TReplyData>,
  ): ReplyEvent<TReplyData> {
    return new BasicReplyEvent<TReplyData>(inquiry, reply)
  }
}
