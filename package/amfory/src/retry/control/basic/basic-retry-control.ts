import type { ReplyStatus } from '../../../reply'

import type { RetryControl } from '../retry-control'

export class BasicRetryControl implements RetryControl {
  private readonly statuses: ReplyStatus[]

  public constructor(statuses: ReplyStatus[]) {
    this.statuses = statuses
  }

  public confirmError(): boolean {
    return true
  }

  public confirmStatus(status: ReplyStatus): boolean {
    return this.statuses.includes(status)
  }
}
