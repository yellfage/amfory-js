import type { HttpStatus } from '../http-status'

import { validateDefaultRequestRetryPolicyOptions } from '../interior'

import type { DefaultRequestRetryPolicyOptions } from './default-request-retry-policy-options'

import type { RequestRetryPolicy } from './request-retry-policy'

import { RETRYABLE_HTTP_STATUSES } from './retryable-http-statuses'

const DEFAULT_DELAY_INDEX = -1
const DEFAULT_RETRIES_AFTER_DELAYS = 0

export class DefaultRequestRetryPolicy implements RequestRetryPolicy {
  private readonly delays: number[]

  private readonly minDelayOffset: number

  private readonly maxDelayOffset: number

  private readonly maxRetriesAfterDelays: number

  private readonly retryableStatuses: HttpStatus[]

  private delayIndex: number

  private retriesAfterDelays: number

  public constructor(options: DefaultRequestRetryPolicyOptions = {}) {
    validateDefaultRequestRetryPolicyOptions(options)

    const {
      delays = [1000, 2000, 5000],
      minDelayOffset = 0,
      maxDelayOffset = 0,
      maxRetriesAfterDelays = -1,
      retryableStatuses = RETRYABLE_HTTP_STATUSES
    } = options

    this.delays = delays
    this.minDelayOffset = minDelayOffset
    this.maxDelayOffset = maxDelayOffset
    this.maxRetriesAfterDelays = maxRetriesAfterDelays
    this.retryableStatuses = retryableStatuses

    this.delayIndex = DEFAULT_DELAY_INDEX
    this.retriesAfterDelays = DEFAULT_RETRIES_AFTER_DELAYS
  }

  public confirm(): boolean {
    return (
      !this.arePrimaryRetriesExhausted() || !this.areSecondaryRetriesExhausted()
    )
  }

  public confirmStatus(status: HttpStatus): boolean {
    return this.confirm() && this.retryableStatuses.includes(status)
  }

  public getNextDelay(): number {
    if (this.arePrimaryRetriesExhausted()) {
      this.retriesAfterDelays += 1
    } else {
      this.delayIndex += 1
    }

    const delay = this.delays[this.delayIndex] || 0

    const delayAddition = this.generateRandomInt(
      this.minDelayOffset,
      this.maxDelayOffset
    )

    return delay + delayAddition
  }

  public reset(): void {
    this.delayIndex = DEFAULT_DELAY_INDEX
    this.retriesAfterDelays = DEFAULT_RETRIES_AFTER_DELAYS
  }

  private arePrimaryRetriesExhausted(): boolean {
    return !this.delays.length || this.delayIndex === this.delays.length - 1
  }

  private areSecondaryRetriesExhausted(): boolean {
    return this.retriesAfterDelays === this.maxRetriesAfterDelays
  }

  private generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
