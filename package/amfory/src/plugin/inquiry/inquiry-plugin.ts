import type { Inquiry } from '../../inquiry'

export interface InquiryPlugin {
  initialize(inquiry: Inquiry): void
}
