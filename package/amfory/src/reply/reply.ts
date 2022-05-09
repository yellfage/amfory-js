import type { ReplyStatus } from './reply-status'

export interface Reply<TResult = unknown> {
  readonly headers: Headers
  readonly status: ReplyStatus
  readonly statusText: string
  readonly data: TResult
}
