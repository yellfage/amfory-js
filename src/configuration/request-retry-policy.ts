import type { HttpStatus } from '../http-status'

export interface RequestRetryPolicy {
  confirm: () => boolean
  confirmStatus: (status: HttpStatus) => boolean
  getNextDelay: (retries: number) => number
  reset: () => void
}
