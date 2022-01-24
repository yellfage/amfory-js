import type {
  InquiryMethod,
  InquirySerializedPayload,
  InquiryShape,
} from '../../inquiry'

export interface InquiryShapeFactory {
  create(
    method: InquiryMethod,
    url: URL,
    headers: Headers,
    payload: InquirySerializedPayload,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    abortController: AbortController,
  ): InquiryShape
}
