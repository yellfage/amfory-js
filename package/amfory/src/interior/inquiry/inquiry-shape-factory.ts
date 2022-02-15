import type { InquirySerializedPayload, InquiryShape } from '../../inquiry'

export interface InquiryShapeFactory {
  create(
    method: string,
    url: URL,
    headers: Headers,
    payload: InquirySerializedPayload,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    abortController: AbortController,
  ): InquiryShape
}
