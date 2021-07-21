import { Callback } from './callback'

export type RequestContext = {
  attemptAbortController: AbortController
  rejectionTimeoutId: number
  attemptRejectionTimeoutId: number
  abortionHandler: Callback<[Event]>
}
