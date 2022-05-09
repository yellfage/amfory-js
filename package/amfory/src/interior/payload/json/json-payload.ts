import type { Payload } from '../../../payload'

export class JsonPayload<TValue> implements Payload {
  private readonly value: TValue

  public constructor(value: TValue) {
    this.value = value
  }

  public serialize(headers: Headers): string {
    headers.set('content-type', 'application/json')

    return JSON.stringify(this.value)
  }
}
