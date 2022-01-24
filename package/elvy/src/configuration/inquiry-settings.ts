import type { RetryControl, RetryDelayScheme } from '../retry'

export interface InquirySettings {
  readonly headers: Headers

  readonly rejectionDelay: number

  readonly attemptRejectionDelay: number

  readonly retryControl: RetryControl

  readonly retryDelayScheme: RetryDelayScheme
}
