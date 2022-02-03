/* eslint-disable no-console */
import type { Inquiry, Plugin } from '../../../src'

export class LocalPlugin implements Plugin {
  private readonly inquiry: Inquiry

  public constructor(inquiry: Inquiry) {
    this.inquiry = inquiry
  }

  public initialize(): void {
    this.inquiry.on('inquiry', (event) => console.log('Local plugin', event))
    this.inquiry.on('reply', (event) => console.log('Local plugin', event))
    this.inquiry.on('retry', (event) => console.log('Local plugin', event))

    this.inquiry.shape.url.searchParams.set('plugin-param', 'plugin-value')
  }

  public terminate(): void {
    console.log('Local plugin termination')
  }
}
