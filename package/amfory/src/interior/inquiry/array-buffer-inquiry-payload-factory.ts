import type { InquiryPayload } from '../../inquiry'

import { ArrayBufferInquiryPayload } from './array-buffer-inquiry-payload'

export class ArrayBufferInquiryPayloadFactory {
  public create(value: ArrayBuffer | ArrayBufferView): InquiryPayload {
    return new ArrayBufferInquiryPayload(value)
  }
}
