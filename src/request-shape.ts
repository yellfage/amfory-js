import { HttpMethod } from './http-method'
import { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'
import { RequestRetryConfirmationCallback } from './request-retry-confirmation-callback'

export type RequestShape<TPayload = any> = {
  url: URL
  method: HttpMethod
  headers: Headers
  payload: TPayload
  rejectionDelay: number
  attemptRejectionDelay: number
  retryDelays: number[]
  minRetryDelayAddition: number
  maxRetryDelayAddition: number
  maxRetriesAfterDelays: number
  abortController: AbortController
  confirmRetry: RequestRetryConfirmationCallback
  confirmResolve: RequestResolveConfirmationCallback
}
