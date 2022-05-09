import type { SerializedPayload } from './serialized-payload'

export interface Payload {
  serialize(headers: Headers): SerializedPayload
}
