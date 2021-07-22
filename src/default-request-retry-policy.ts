import { DefaultRetryRequestPolicyOptions } from './default-retry-request-policy-options'
import { IRequestRetryPolicy } from './i-request-retry-policy'
import { RequestRetryConfirmationCallback } from './request-retry-confirmation-callback'
import { RequestResult } from './request-result'

import { HttpStatus } from './http-status'

const RETRYABLE_HTTP_STATUSES: HttpStatus[] = [
  HttpStatus.RequestTimeout,
  HttpStatus.InternalServerError,
  HttpStatus.ServiceUnavailable,
  HttpStatus.GatewayTimeout,
  HttpStatus.InsufficientStorage,
  HttpStatus.BandwidthLimitExceeded,
  HttpStatus.UnknownError,
  HttpStatus.WebServerIsDown,
  HttpStatus.ConnectionTimedOut,
  HttpStatus.OriginIsUnreachable,
  HttpStatus.TimeoutOccurred
]

const DEFAULT_RETRY_DELAY_INDEX = -1
const DEFAULT_RETRIES_AFTER_DELAYS = 0

export class DefaultRequestRetryPolicy implements IRequestRetryPolicy {
  private readonly retryDelays: number[]
  private readonly minRetryDelayAddition: number
  private readonly maxRetryDelayAddition: number
  private readonly maxRetriesAfterDelays: number
  private readonly confirmRetryCallback: RequestRetryConfirmationCallback

  private retryDelayIndex: number
  private retriesAfterDelays: number

  public constructor({
    retryDelays = [1000, 2000, 5000],
    minRetryDelayAddition = 0,
    maxRetryDelayAddition = 0,
    maxRetriesAfterDelays = 0,
    confirmRetry = (result) => RETRYABLE_HTTP_STATUSES.includes(result.status)
  }: DefaultRetryRequestPolicyOptions = {}) {
    this.retryDelays = retryDelays
    this.minRetryDelayAddition = minRetryDelayAddition
    this.maxRetryDelayAddition = maxRetryDelayAddition
    this.maxRetriesAfterDelays = maxRetriesAfterDelays
    this.confirmRetryCallback = confirmRetry

    this.retryDelayIndex = DEFAULT_RETRY_DELAY_INDEX
    this.retriesAfterDelays = DEFAULT_RETRIES_AFTER_DELAYS
  }

  public confirmRetry(result: RequestResult): boolean {
    return this.confirmRetryCallback(result)
  }

  public isMaxRetriesReached(): boolean {
    return (
      this.arePrimaryRetriesExhausted() && this.isMaxRetriesAfterDelaysReached()
    )
  }

  public getNextRetryDelay(): number {
    if (this.arePrimaryRetriesExhausted()) {
      ++this.retriesAfterDelays
    } else {
      ++this.retryDelayIndex
    }

    const originalDelay = this.retryDelays[this.retryDelayIndex]

    const delayAddition = this.generateRandomInt(
      this.minRetryDelayAddition,
      this.maxRetryDelayAddition
    )

    return originalDelay + delayAddition
  }

  public reset(): void {
    this.retryDelayIndex = DEFAULT_RETRY_DELAY_INDEX
    this.retriesAfterDelays = DEFAULT_RETRIES_AFTER_DELAYS
  }

  private arePrimaryRetriesExhausted(): boolean {
    return (
      !this.retryDelays.length ||
      this.retryDelayIndex === this.retryDelays.length - 1
    )
  }

  private isMaxRetriesAfterDelaysReached() {
    return this.retriesAfterDelays === this.maxRetriesAfterDelays
  }

  private generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
