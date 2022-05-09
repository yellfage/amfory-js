import type { InquirySerializedPayload } from './payload'

export interface InquiryShape {
  readonly method: string
  readonly url: URL
  readonly headers: Headers
  readonly payload: InquirySerializedPayload
  readonly rejectionDelay: number
  readonly attemptRejectionDelay: number
  readonly abortController: AbortController
}
