import type { InquiryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

export abstract class BasicInquiryEvent<TResult = unknown>
  implements InquiryEvent<TResult>
{
  public readonly target: Inquiry<TResult>

  public constructor(target: Inquiry<TResult>) {
    this.target = target
  }
}
