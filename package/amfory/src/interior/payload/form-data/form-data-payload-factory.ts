import type { Payload } from '../../../payload'

import { FormDataPayload } from './form-data-payload'

export class FormDataPayloadFactory {
  public create(value: FormData): Payload {
    return new FormDataPayload(value)
  }
}
