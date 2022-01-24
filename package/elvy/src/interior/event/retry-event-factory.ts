import type { RetryEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { RetryContext } from '../../retry'

export interface RetryEventFactory {
  create(inquiry: Inquiry, context: RetryContext): RetryEvent
}
