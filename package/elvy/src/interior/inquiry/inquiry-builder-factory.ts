import type { InquiryBuilder, InquiryMethod } from '../../inquiry'

export interface InquiryBuilderFactory {
  create(method: InquiryMethod): InquiryBuilder
}
