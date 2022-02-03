import { BasicRetryDelayScheme } from './basic-retry-delay-scheme'

import type { RetryDelayScheme } from './retry-delay-scheme'

import type { RetryDelaySchemeBuilder } from './retry-delay-scheme-builder'

export class BasicRetryDelaySchemeBuilder implements RetryDelaySchemeBuilder {
  private delays = [1000, 2000, 5000]

  private minDelayOffset = 0

  private maxDelayOffset = 0

  public setDelays(delays: number[]): this {
    this.delays = delays

    return this
  }

  public setMinDelayOffset(offset: number): this {
    this.minDelayOffset = offset

    return this
  }

  public setMaxDelayOffset(offset: number): this {
    this.maxDelayOffset = offset

    return this
  }

  public build(): RetryDelayScheme {
    return new BasicRetryDelayScheme(
      this.delays,
      this.minDelayOffset,
      this.maxDelayOffset,
    )
  }
}
