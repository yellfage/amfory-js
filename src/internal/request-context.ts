import { Callback } from './callback'

export type RequestContext = {
  retryDelayIndex: number
  totalRetries: number
  retriesAfterDelays: number
  attemptAbortController: AbortController
  rejectionTimer: NodeJS.Timeout | null
  attemptRejectionTimer: NodeJS.Timeout | null
  abortionHandler: Callback<[Event]> | null
}
