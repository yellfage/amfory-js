import type { Reply, ReplyStatus } from '../../reply'

export interface ReplyFactory {
  create<TResult>(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TResult,
  ): Reply<TResult>
}
