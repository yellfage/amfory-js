import type { Inquiry, Plugin, PluginBuilder } from '@yellfage/amfory'

import { LocalPlugin } from './local-plugin'

export class LocalPluginBuilder implements PluginBuilder {
  public build(inquiry: Inquiry): Plugin {
    return new LocalPlugin(inquiry)
  }
}
