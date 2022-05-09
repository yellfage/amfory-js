import type { ReplyingEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

export interface ReplyingEventFactory {
  create<TResult>(
    target: Inquiry<TResult>,
    reply: Reply<TResult>,
  ): ReplyingEvent<TResult>
}
