/* eslint-disable no-console */
import type { Inquiry, Plugin } from '../../../src'

export class GlobalPlugin implements Plugin {
  private readonly foo: string

  private readonly inquiry: Inquiry

  public constructor(foo: string, inquiry: Inquiry) {
    this.foo = foo
    this.inquiry = inquiry
  }

  public initialize(): void {
    this.inquiry.on('inquiry', (event) => console.log('Global plugin', event))
    this.inquiry.on('reply', (event) => console.log('Global plugin', event))
    this.inquiry.on('retry', (event) => console.log('Global plugin', event))

    this.inquiry.items.set<string>('foo', this.foo)

    const foo = this.inquiry.items.get<string>('foo')

    console.log('Foo item', foo)
  }

  public terminate(): void {
    console.log('Global plugin termination')
  }
}
