import type { InquiryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import { BasicInquiryEvent } from './basic-inquiry-event'

import type { InquiryEventFactory } from './inquiry-event-factory'

export class BasicInquiryEventFactory implements InquiryEventFactory {
  public create(inquiry: Inquiry): InquiryEvent {
    return new BasicInquiryEvent(inquiry)
  }
}
