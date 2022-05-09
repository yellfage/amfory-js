import type { Payload } from '../../payload'

export class EmptyPayload implements Payload {
  public serialize(): Promise<null> {
    return Promise.resolve(null)
  }
}
