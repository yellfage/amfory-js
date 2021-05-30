import { RequestRetryConfirmationCallback } from './request-retry-confirmation-callback'
import { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'

export type RequestOptions = {
  baseUrl?: string
  paramsInit?: string | string[][] | Record<string, string> | URLSearchParams
  headersInit?: HeadersInit
  abortController?: AbortController
  rejectionDelay?: number
  attemptRejectionDelay?: number
  retryDelays?: number[]
  minRetryDelayAddition?: number
  maxRetryDelayAddition?: number
  maxRetriesAfterDelays?: number
  confirmRetry?: RequestRetryConfirmationCallback
  confirmResolve?: RequestResolveConfirmationCallback
}
