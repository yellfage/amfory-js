import type { ReplyStatus } from '../reply'

export interface RetryControl {
  confirmError(error: unknown): boolean
  confirmStatus(status: ReplyStatus): boolean
}
