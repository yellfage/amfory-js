import type {
  RequestRetryPolicy,
  RequestResolveConfirmationCallback
} from './configuration'

export interface RequestOptions {
  baseUrl?: string
  params?: string | string[][] | Record<string, string> | URLSearchParams
  headers?: HeadersInit
  rejectionDelay?: number
  attemptRejectionDelay?: number
  retryPolicy?: RequestRetryPolicy
  abortController?: AbortController
  confirmResolve?: RequestResolveConfirmationCallback
}
