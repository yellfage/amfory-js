import type { HttpStatus } from '../http-status'

export interface DefaultRequestRetryPolicyOptions {
  readonly delays?: number[]
  readonly minDelayOffset?: number
  readonly maxDelayOffset?: number
  readonly maxRetriesAfterDelays?: number
  readonly retryableStatuses?: HttpStatus[]
}
