import type { ReplyStatus } from '../reply'

import type { RetryControl } from './retry-control'

export class BasicRetryControl implements RetryControl {
  private readonly retryableStatuses: ReplyStatus[]

  public constructor(retryableStatuses: ReplyStatus[]) {
    this.retryableStatuses = retryableStatuses
  }

  public confirmError(): boolean {
    return true
  }

  public confirmStatus(status: ReplyStatus): boolean {
    return this.retryableStatuses.includes(status)
  }
}
