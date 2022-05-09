import type { Reply, ReplyStatus } from '../../reply'

export class BasicReply<TResult = unknown> implements Reply<TResult> {
  public headers: Headers

  public status: ReplyStatus

  public statusText: string

  public data: TResult

  public constructor(
    headers: Headers,
    status: ReplyStatus,
    statusText: string,
    data: TResult,
  ) {
    this.headers = headers
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}
