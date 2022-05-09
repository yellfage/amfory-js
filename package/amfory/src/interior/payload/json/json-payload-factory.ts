import type { Payload } from '../../../payload'

import { JsonPayload } from './json-payload'

export class JsonPayloadFactory {
  public create<TValue>(value: TValue): Payload {
    return new JsonPayload(value)
  }
}
