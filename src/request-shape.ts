import { HttpMethod } from './http-method'
import { IRequestRetryPolicy } from './i-request-retry-policy'
import { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'

export type RequestShape<TPayload = any> = {
  url: URL
  method: HttpMethod
  headers: Headers
  payload: TPayload
  rejectionDelay: number
  attemptRejectionDelay: number
  retryPolicy: IRequestRetryPolicy
  abortController: AbortController
  confirmResolve: RequestResolveConfirmationCallback
}
