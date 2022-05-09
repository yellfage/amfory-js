import type { Payload } from '../../../payload'

export class ArrayBufferPayload implements Payload {
  private readonly value: ArrayBuffer | ArrayBufferView

  public constructor(value: ArrayBuffer | ArrayBufferView) {
    this.value = value
  }

  public serialize(headers: Headers): Promise<ArrayBuffer | ArrayBufferView> {
    headers.set('content-type', 'application/octet-stream')

    return Promise.resolve(this.value)
  }
}
