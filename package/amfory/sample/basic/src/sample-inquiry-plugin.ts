/* eslint-disable no-console */
import type { Inquiry, InquiryPlugin } from '@yellfage/amfory'

export class SampleInquiryPlugin implements InquiryPlugin {
  public initialize(inquiry: Inquiry): void {
    inquiry.inquiring.add((event) => console.log('Inquiry plugin', event))
    inquiry.replying.add((event) => console.log('Inquiry plugin', event))
    inquiry.retrying.add((event) => console.log('Inquiry plugin', event))

    inquiry.url.searchParams.set('plugin-param', 'plugin-value')
  }
}
