import type { InquiryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

export class BasicInquiryEvent implements InquiryEvent {
  public readonly inquiry: Inquiry

  public constructor(inquiry: Inquiry) {
    this.inquiry = inquiry
  }
}
