import { HttpMethod } from './http-method'

import {
  RequestRetryPolicy,
  RequestResolveConfirmationCallback
} from './configuration'

export interface RequestShape<TPayload = any> {
  url: URL
  method: HttpMethod
  headers: Headers
  payload: TPayload
  rejectionDelay: number
  attemptRejectionDelay: number
  retryPolicy: RequestRetryPolicy
  abortController: AbortController
  confirmResolve: RequestResolveConfirmationCallback
}
