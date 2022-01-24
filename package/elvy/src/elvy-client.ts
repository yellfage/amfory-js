import type { EventHandlerMap } from './event-handler-map'

import type { InquiryBuilder, InquiryMethod } from './inquiry'

import type { PluginBuilder } from './plugin'

export interface ElvyClient {
  use(builder: PluginBuilder): this

  on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): EventHandlerMap[TEventName]

  off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): void

  inquire(method: InquiryMethod): InquiryBuilder
}
