import type { InquirySerializedPayload, InquiryShape } from '../../inquiry'

export class BasicInquiryShape implements InquiryShape {
  public readonly method: string

  public readonly url: URL

  public readonly headers: Headers

  public readonly payload: InquirySerializedPayload

  public readonly rejectionDelay: number

  public readonly attemptRejectionDelay: number

  public readonly abortController: AbortController

  public constructor(
    method: string,
    url: URL,
    headers: Headers,
    payload: InquirySerializedPayload,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    abortController: AbortController,
  ) {
    this.method = method
    this.url = url
    this.headers = headers
    this.payload = payload
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.abortController = abortController
  }
}
