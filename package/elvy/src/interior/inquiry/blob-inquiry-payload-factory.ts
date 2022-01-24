import type { InquiryPayload } from '../../inquiry'

import { BlobInquiryPayload } from './blob-inquiry-payload'

export class BlobInquiryPayloadFactory {
  public create(value: Blob): InquiryPayload {
    return new BlobInquiryPayload(value)
  }
}
