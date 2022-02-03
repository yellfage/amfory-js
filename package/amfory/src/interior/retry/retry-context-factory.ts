import type { RetryContext } from '../../retry'

export interface RetryContextFactory {
  create(delay: number): RetryContext
}
