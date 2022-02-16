import type { InquirySettings } from '../../configuration'

import type { RetryControl, RetryDelayScheme } from '../../retry'

export class BasicInquirySettings implements InquirySettings {
  public readonly headers: Headers

  public readonly rejectionDelay: number

  public readonly attemptRejectionDelay: number

  public readonly retryControl: RetryControl

  public readonly retryDelayScheme: RetryDelayScheme

  public constructor(
    headers: Headers,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    retryControl: RetryControl,
    retryDelayScheme: RetryDelayScheme,
  ) {
    this.headers = headers
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.retryControl = retryControl
    this.retryDelayScheme = retryDelayScheme
  }
}
