import type { EventEmitter } from '@yellfage/event-emitter'

import type { EventHandlerMap } from '../../event-handler-map'

import type { Inquiry, InquiryItems, InquiryShape } from '../../inquiry'

import type { ReplyBodyReader } from '../../reply'

export interface InquiryFactory {
  create<TResult>(
    shape: InquiryShape,
    items: InquiryItems,
    eventEmitter: EventEmitter<EventHandlerMap>,
    replyBodyReader: ReplyBodyReader<TResult>,
  ): Inquiry<TResult>
}
