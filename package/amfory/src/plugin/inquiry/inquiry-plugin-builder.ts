import type { InquiryPlugin } from './inquiry-plugin'

export interface InquiryPluginBuilder {
  build(): InquiryPlugin
}
