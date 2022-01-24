import type { RetryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { RetryContext } from '../../retry'

export class BasicRetryEvent implements RetryEvent {
  public readonly inquiry: Inquiry

  public readonly context: RetryContext

  public constructor(inquiry: Inquiry, context: RetryContext) {
    this.inquiry = inquiry
    this.context = context
  }
}
