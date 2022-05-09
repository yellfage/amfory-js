import type { RetryingEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

export interface RetryingEventFactory {
  create<TResult>(target: Inquiry<TResult>, delay: number): RetryingEvent
}
