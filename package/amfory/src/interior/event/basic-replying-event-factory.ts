import type { ReplyingEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

import { BasicReplyingEvent } from './basic-replying-event'

import type { ReplyingEventFactory } from './replying-event-factory'

export class BasicReplyingEventFactory implements ReplyingEventFactory {
  public create<TResult>(
    target: Inquiry<TResult>,
    reply: Reply<TResult>,
  ): ReplyingEvent<TResult> {
    return new BasicReplyingEvent<TResult>(target, reply)
  }
}
