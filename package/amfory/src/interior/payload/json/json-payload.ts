import type { Payload } from '../../../payload'

export class JsonPayload<TValue> implements Payload {
  private readonly value: TValue

  public constructor(value: TValue) {
    this.value = value
  }

  public serialize(headers: Headers): Promise<string> {
    headers.set('content-type', 'application/json')

    return Promise.resolve(JSON.stringify(this.value))
  }
}
