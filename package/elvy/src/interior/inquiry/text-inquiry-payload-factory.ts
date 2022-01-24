import type { InquiryPayload } from '../../inquiry'

import { TextInquiryPayload } from './text-inquiry-payload'

export class TextInquiryPayloadFactory {
  public create(value: string | number): InquiryPayload {
    return new TextInquiryPayload(value)
  }
}
