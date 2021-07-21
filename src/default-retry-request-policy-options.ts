import { RequestRetryConfirmationCallback } from './request-retry-confirmation-callback'

export type DefaultRetryRequestPolicyOptions = {
  readonly retryDelays?: number[]
  readonly minRetryDelayAddition?: number
  readonly maxRetryDelayAddition?: number
  readonly maxRetriesAfterDelays?: number
  readonly confirmRetry?: RequestRetryConfirmationCallback
}
