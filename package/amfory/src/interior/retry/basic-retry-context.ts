import type { RetryContext } from '../../retry'

export class BasicRetryContext implements RetryContext {
  public readonly delay: number

  public constructor(delay: number) {
    this.delay = delay
  }
}
