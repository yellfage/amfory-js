import type { RequestRetryContext } from './request-retry-context'

import type { RequestShape } from './request-shape'

export interface RequestRetryEvent {
  readonly shape: RequestShape
  readonly context: RequestRetryContext
}
