import type { InquiringEvent } from '../../../event'

import type { Inquiry } from '../../../inquiry'

import { BasicInquiryEvent } from '../basic-inquiry-event'

export class BasicInquiringEvent<TResult>
  extends BasicInquiryEvent<TResult>
  implements InquiringEvent<TResult>
{
  public constructor(target: Inquiry<TResult>) {
    super(target)
  }
}
