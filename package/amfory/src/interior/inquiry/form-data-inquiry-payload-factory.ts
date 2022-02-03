import type { InquiryPayload } from '../../inquiry'

import { FormDataInquiryPayload } from './form-data-inquiry-payload'

export class FormDataInquiryPayloadFactory {
  public create(value: FormData): InquiryPayload {
    return new FormDataInquiryPayload(value)
  }
}
