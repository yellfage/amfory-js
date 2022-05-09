import type { Payload } from '../../../payload'

export class TextPayload implements Payload {
  private readonly value: string | number

  public constructor(value: string | number) {
    this.value = value
  }

  public serialize(): Promise<string> {
    return Promise.resolve(this.value.toString())
  }
}
