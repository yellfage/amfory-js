import type { ReplyStatus } from './reply-status'

export interface Reply<TData = unknown> {
  readonly headers: Headers
  readonly status: ReplyStatus
  readonly statusText: string
  readonly data: TData
}
