import type { AmforyClient } from '../../amfory-client'

export interface ClientPlugin {
  initialize(client: AmforyClient): void
}
