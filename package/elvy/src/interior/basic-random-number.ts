import type { RandomNumber } from './random-number'

export class BasicRandomNumber implements RandomNumber {
  private readonly min: number

  private readonly max: number

  public constructor(min: number, max: number) {
    this.min = min
    this.max = max
  }

  public next(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
  }
}
