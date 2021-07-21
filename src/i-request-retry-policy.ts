import { HttpStatus } from './http-status'

export interface IRequestRetryPolicy {
  confirmRetry(status: HttpStatus): boolean
  isMaxRetriesReached(): boolean
  getNextRetryDelay(): number
  reset(): void
}
