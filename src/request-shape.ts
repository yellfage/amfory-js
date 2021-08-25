import { HttpMethod } from './http-method'

import {
  RequestRetryPolicy,
  RequestResolveConfirmationCallback
} from './configuration'

export interface RequestShape<TPayload = any> {
  readonly url: URL
  readonly method: HttpMethod
  readonly headers: Headers
  readonly payload: TPayload
  readonly rejectionDelay: number
  readonly attemptRejectionDelay: number
  readonly retryPolicy: RequestRetryPolicy
  readonly abortController: AbortController
  readonly confirmResolve: RequestResolveConfirmationCallback
}
