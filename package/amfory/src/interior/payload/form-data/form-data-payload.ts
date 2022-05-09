import type { Payload } from '../../../payload'

export class FormDataPayload implements Payload {
  private readonly value: FormData

  public constructor(value: FormData) {
    this.value = value
  }

  public serialize(): Promise<FormData> {
    return Promise.resolve(this.value)
  }
}
