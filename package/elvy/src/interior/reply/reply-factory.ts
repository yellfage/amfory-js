import type { Reply, ReplyStatus } from '../../reply'

export interface ReplyFactory {
  create<TData>(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TData,
  ): Reply<TData>
}
