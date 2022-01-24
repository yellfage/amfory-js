import type { InquiryPayload } from '../../inquiry'

export class FormDataInquiryPayload implements InquiryPayload {
  private readonly value: FormData

  public constructor(value: FormData) {
    this.value = value
  }

  public serialize(): Promise<FormData> {
    return Promise.resolve(this.value)
  }
}
