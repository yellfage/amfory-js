import type { RequestResult } from './request-result'

import type { RequestShape } from './request-shape'

export interface RequestResultEvent {
  readonly shape: RequestShape
  readonly result: RequestResult
}
