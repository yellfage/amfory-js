import type { InquiryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

export interface InquiryEventFactory {
  create(inquiry: Inquiry): InquiryEvent
}
