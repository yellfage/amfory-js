import type { InquiryMethod } from './inquiry-method'

import type { InquirySerializedPayload } from './inquiry-serialized-payload'

export interface InquiryShape {
  readonly method: InquiryMethod
  readonly url: URL
  readonly headers: Headers
  readonly payload: InquirySerializedPayload
  readonly rejectionDelay: number
  readonly attemptRejectionDelay: number
  readonly abortController: AbortController
}
