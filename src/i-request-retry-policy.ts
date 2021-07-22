import { RequestResult } from './request-result'

export interface IRequestRetryPolicy {
  confirmRetry(result: RequestResult): boolean
  isMaxRetriesReached(): boolean
  getNextRetryDelay(): number
  reset(): void
}
