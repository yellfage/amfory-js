import type { RetryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { RetryContext } from '../../retry'

import { BasicRetryEvent } from './basic-retry-event'

import type { RetryEventFactory } from './retry-event-factory'

export class BasicRetryEventFactory implements RetryEventFactory {
  public create(inquiry: Inquiry, context: RetryContext): RetryEvent {
    return new BasicRetryEvent(inquiry, context)
  }
}
