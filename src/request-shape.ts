import type {
  RequestRetryPolicy,
  RequestResolveConfirmationCallback
} from './configuration'

import type { HttpMethod } from './http-method'

export interface RequestShape<TPayload = unknown> {
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
