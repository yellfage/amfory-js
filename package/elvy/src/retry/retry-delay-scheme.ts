export interface RetryDelayScheme {
  moveNext(): number
  reset(): void
}
