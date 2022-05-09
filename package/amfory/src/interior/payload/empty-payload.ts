import type { Payload } from '../../payload'

export class EmptyPayload implements Payload {
  public serialize(): null {
    return null
  }
}
