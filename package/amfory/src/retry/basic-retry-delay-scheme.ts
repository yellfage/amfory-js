import type { RetryDelayScheme } from './retry-delay-scheme'

const DEFAULT_DELAY_INDEX = -1

export class BasicRetryDelayScheme implements RetryDelayScheme {
  private readonly delays: number[]

  private readonly minDelayOffset: number

  private readonly maxDelayOffset: number

  private delayIndex: number = DEFAULT_DELAY_INDEX

  public constructor(
    delays: number[],
    minDelayOffset: number,
    maxDelayOffset: number,
  ) {
    this.delays = delays
    this.minDelayOffset = minDelayOffset
    this.maxDelayOffset = maxDelayOffset
  }

  public moveNext(): number {
    if (this.delayIndex < this.delays.length - 1) {
      this.delayIndex += 1
    }

    return this.delays[this.delayIndex] + this.generateDelayOffset()
  }

  public reset(): void {
    this.delayIndex = DEFAULT_DELAY_INDEX
  }

  private generateDelayOffset(): number {
    return (
      Math.floor(
        Math.random() * (this.maxDelayOffset - this.minDelayOffset + 1),
      ) + this.minDelayOffset
    )
  }
}
