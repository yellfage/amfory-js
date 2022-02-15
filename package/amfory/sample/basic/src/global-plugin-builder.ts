import type { Inquiry, Plugin, PluginBuilder } from '@yellfage/amfory'

import { GlobalPlugin } from './global-plugin'

export class GlobalPluginBuilder implements PluginBuilder {
  private foo: string

  public setFoo(value: string): this {
    this.foo = value

    return this
  }

  public build(inquiry: Inquiry): Plugin {
    return new GlobalPlugin(this.foo, inquiry)
  }
}
