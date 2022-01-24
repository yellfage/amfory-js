import type { Reply, ReplyStatus } from '../../reply'

import { BasicReply } from './basic-reply'

import type { ReplyFactory } from './reply-factory'

export class BasicReplyFactory implements ReplyFactory {
  public create<TData>(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TData,
  ): Reply<TData> {
    return new BasicReply(headers, status, statusText, data)
  }
}
