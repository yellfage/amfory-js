import type { InquiryPayload } from '../../inquiry'

export class JsonInquiryPayload<TValue> implements InquiryPayload {
  private readonly value: TValue

  public constructor(value: TValue) {
    this.value = value
  }

  public serialize(headers: Headers): Promise<string> {
    headers.set('content-type', 'application/json')

    return Promise.resolve(JSON.stringify(this.value))
  }
}
