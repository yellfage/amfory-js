import type { Inquiry } from '../inquiry'

import type { RetryContext } from '../retry'

export interface RetryEvent {
  readonly inquiry: Inquiry
  readonly context: RetryContext
}
