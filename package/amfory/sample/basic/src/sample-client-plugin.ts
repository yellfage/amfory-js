/* eslint-disable no-console */
import type { AmforyClient, ClientPlugin } from '@yellfage/amfory'

export class SampleClientPlugin implements ClientPlugin {
  public initialize(client: AmforyClient): void {
    client.inquiring.add((event) => console.log('Client plugin', event))
    client.replying.add((event) => console.log('Client plugin', event))
    client.retrying.add((event) => console.log('Client plugin', event))
  }
}
