import type { InquiryPayload } from '../../../../inquiry'

export class TextInquiryPayload implements InquiryPayload {
  private readonly value: string | number

  public constructor(value: string | number) {
    this.value = value
  }

  public serialize(): Promise<string> {
    return Promise.resolve(this.value.toString())
  }
}
