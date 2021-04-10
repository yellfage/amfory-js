import { Callback } from './callback'

export type RequestContext = {
  retryDelayIndex: number
  totalRetries: number
  retriesAfterDelays: number
  attemptAbortController: AbortController
  rejectionTimeoutId: number
  attemptRejectionTimeoutId: number
  abortionHandler: Callback<[Event]>
}
