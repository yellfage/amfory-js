import { IRequestRetryPolicy } from './i-request-retry-policy'
import { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'

export type RequestOptions = {
  baseUrl?: string
  paramsInit?: string | string[][] | Record<string, string> | URLSearchParams
  headersInit?: HeadersInit
  rejectionDelay?: number
  attemptRejectionDelay?: number
  retryPolicy?: IRequestRetryPolicy
  abortController?: AbortController
  confirmResolve?: RequestResolveConfirmationCallback
}
