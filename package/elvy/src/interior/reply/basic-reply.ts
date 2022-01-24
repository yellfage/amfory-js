import type { Reply, ReplyStatus } from '../../reply'

export class BasicReply<TData = unknown> implements Reply<TData> {
  public headers: Headers

  public status: ReplyStatus

  public statusText: string

  public data: TData

  public constructor(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TData,
  ) {
    this.headers = headers
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}
