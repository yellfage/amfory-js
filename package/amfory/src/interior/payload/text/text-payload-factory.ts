import type { Payload } from '../../../payload'

import { TextPayload } from './text-payload'

export class TextPayloadFactory {
  public create(value: string | number): Payload {
    return new TextPayload(value)
  }
}
