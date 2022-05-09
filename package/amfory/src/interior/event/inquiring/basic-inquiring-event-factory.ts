import type { InquiringEvent } from '../../../event'

import type { Inquiry } from '../../../inquiry'

import { BasicInquiringEvent } from './basic-inquiring-event'

import type { InquiringEventFactory } from './inquiring-event-factory'

export class BasicInquiringEventFactory implements InquiringEventFactory {
  public create<TResult>(target: Inquiry<TResult>): InquiringEvent {
    return new BasicInquiringEvent(target)
  }
}
