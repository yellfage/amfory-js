import { RequestRetryConfirmationCallback } from '../request-retry-confirmation-callback'
import { RequestResolveConfirmationCallback } from '../request-resolve-confirmation-callback'

export type RequestSettings = {
  headersInit: HeadersInit
  rejectionDelay: number
  attemptRejectionDelay: number
  retryDelays: number[]
  minRetryDelayAddition: number
  maxRetryDelayAddition: number
  maxRetriesAfterDelays: number
  confirmRetry: RequestRetryConfirmationCallback
  confirmResolve: RequestResolveConfirmationCallback
}
