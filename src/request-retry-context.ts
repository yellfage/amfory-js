export interface RequestRetryContext {
  readonly retries: number
  readonly delay: number
}
