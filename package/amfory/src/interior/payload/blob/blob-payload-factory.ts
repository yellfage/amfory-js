import type { Payload } from '../../../payload'

import { BlobPayload } from './blob-payload'

export class BlobPayloadFactory {
  public create(value: Blob): Payload {
    return new BlobPayload(value)
  }
}
