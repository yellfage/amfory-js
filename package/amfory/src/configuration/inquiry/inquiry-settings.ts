import type { RetryControl, RetryDelayScheme } from '../../retry'

export interface InquirySettings {
  readonly rejectionDelay: number

  readonly attemptRejectionDelay: number

  readonly retryControl: RetryControl

  readonly retryDelayScheme: RetryDelayScheme
}
