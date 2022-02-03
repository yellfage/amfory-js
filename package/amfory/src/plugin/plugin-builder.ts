import type { Inquiry } from '../inquiry'

import type { Plugin } from './plugin'

export interface PluginBuilder {
  build(inquiry: Inquiry): Plugin
}
