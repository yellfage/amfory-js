import type { EventHandlerMap } from '../event-handler-map'

import type { Reply } from '../reply'

import type { InquiryItems } from './inquiry-items'

import type { InquiryShape } from './inquiry-shape'

export interface Inquiry<TResult = unknown> {
  readonly shape: InquiryShape
  readonly items: InquiryItems

  on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): EventHandlerMap[TEventName]

  off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): void

  send(): Promise<Reply<TResult>>
}
