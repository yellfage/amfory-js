import type { InquiryPayload } from '../../inquiry'

export class BlobInquiryPayload implements InquiryPayload {
  private readonly value: Blob

  public constructor(value: Blob) {
    this.value = value
  }

  public serialize(): Promise<Blob> {
    return Promise.resolve(this.value)
  }
}
