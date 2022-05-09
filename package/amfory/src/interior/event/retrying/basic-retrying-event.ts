import type { RetryingEvent } from '../../../event'

import type { Inquiry } from '../../../inquiry'

import { BasicInquiryEvent } from '../basic-inquiry-event'

export class BasicRetryingEvent<TResult>
  extends BasicInquiryEvent<TResult>
  implements RetryingEvent<TResult>
{
  public readonly delay: number

  public constructor(target: Inquiry<TResult>, delay: number) {
    super(target)

    this.delay = delay
  }
}
