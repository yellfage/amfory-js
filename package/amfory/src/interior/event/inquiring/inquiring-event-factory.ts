import type { InquiringEvent } from '../../../event'

import type { Inquiry } from '../../../inquiry'

export interface InquiringEventFactory {
  create<TResult>(target: Inquiry<TResult>): InquiringEvent
}
