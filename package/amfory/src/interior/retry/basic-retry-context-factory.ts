import type { RetryContext } from '../../retry'

import { BasicRetryContext } from './basic-retry-context'

import type { RetryContextFactory } from './retry-context-factory'

export class BasicRetryContextFactory implements RetryContextFactory {
  public create(delay: number): RetryContext {
    return new BasicRetryContext(delay)
  }
}
