import { RequestResolveConfirmationCallback } from '../request-resolve-confirmation-callback'
import { IRequestRetryPolicy } from '../i-request-retry-policy'

export type RequestSettings = {
  baseUrl: string
  headersInit: HeadersInit
  rejectionDelay: number
  attemptRejectionDelay: number
  retryPolicy: IRequestRetryPolicy
  confirmResolve: RequestResolveConfirmationCallback
}
