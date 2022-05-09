import type { InquirySerializedPayload } from './inquiry-serialized-payload'

export interface InquiryPayload {
  serialize(headers: Headers): Promise<InquirySerializedPayload>
}
