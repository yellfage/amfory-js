import type { ClientPluginBuilder } from '@yellfage/amfory'

import { SampleClientPlugin } from './sample-client-plugin'

export class SampleClientPluginBuilder implements ClientPluginBuilder {
  public build(): SampleClientPlugin {
    return new SampleClientPlugin()
  }
}
