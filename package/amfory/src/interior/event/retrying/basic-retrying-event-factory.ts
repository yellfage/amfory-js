import type { RetryingEvent } from '../../../event'

import type { Inquiry } from '../../../inquiry'

import { BasicRetryingEvent } from './basic-retrying-event'

import type { RetryingEventFactory } from './retrying-event-factory'

export class BasicRetryingEventFactory implements RetryingEventFactory {
  public create<TResult>(
    target: Inquiry<TResult>,
    delay: number,
  ): RetryingEvent {
    return new BasicRetryingEvent(target, delay)
  }
}
