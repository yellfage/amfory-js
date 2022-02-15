import type { InquiryBuilder } from '../../inquiry'

export interface InquiryBuilderFactory {
  create(method: string): InquiryBuilder
}
