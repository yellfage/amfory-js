import type { InquiryPluginBuilder } from '@yellfage/amfory'

import { SampleInquiryPlugin } from './sample-inquiry-plugin'

export class SampleInquiryPluginBuilder implements InquiryPluginBuilder {
  public build(): SampleInquiryPlugin {
    return new SampleInquiryPlugin()
  }
}
