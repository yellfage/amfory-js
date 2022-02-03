import type { InquiryPayload } from '../../inquiry'

import { JsonInquiryPayload } from './json-inquiry-payload'

export class JsonInquiryPayloadFactory {
  public create<TValue>(value: TValue): InquiryPayload {
    return new JsonInquiryPayload(value)
  }
}
