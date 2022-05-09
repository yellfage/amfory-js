import type { Payload } from '../../../payload'

import { ArrayBufferPayload } from './array-buffer-payload'

export class ArrayBufferPayloadFactory {
  public create(value: ArrayBuffer | ArrayBufferView): Payload {
    return new ArrayBufferPayload(value)
  }
}
