import type {
  InquiryMethod,
  InquirySerializedPayload,
  InquiryShape,
} from '../../inquiry'

import { BasicInquiryShape } from './basic-inquiry-shape'

import type { InquiryShapeFactory } from './inquiry-shape-factory'

export class BasicInquiryShapeFactory implements InquiryShapeFactory {
  public create(
    method: InquiryMethod,
    url: URL,
    headers: Headers,
    payload: InquirySerializedPayload,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    abortController: AbortController,
  ): InquiryShape {
    return new BasicInquiryShape(
      method,
      url,
      headers,
      payload,
      rejectionDelay,
      attemptRejectionDelay,
      abortController,
    )
  }
}
