import type { Reply, ReplyStatus } from '../../reply'

import { BasicReply } from './basic-reply'

import type { ReplyFactory } from './reply-factory'

export class BasicReplyFactory implements ReplyFactory {
  public create<TResult>(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TResult,
  ): Reply<TResult> {
    return new BasicReply(headers, status, statusText, data)
  }
}
