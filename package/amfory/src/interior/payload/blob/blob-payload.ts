import type { Payload } from '../../../payload'

export class BlobPayload implements Payload {
  private readonly value: Blob

  public constructor(value: Blob) {
    this.value = value
  }

  public serialize(): Blob {
    return this.value
  }
}
