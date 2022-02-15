import type { EventHandlerMap } from './event-handler-map'

import type { InquiryBuilder } from './inquiry'

import type { PluginBuilder } from './plugin'

export interface AmforyClient {
  use(builder: PluginBuilder): this

  on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): EventHandlerMap[TEventName]

  off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): void

  get(path: string): InquiryBuilder
  head(path: string): InquiryBuilder
  post(path: string): InquiryBuilder
  put(path: string): InquiryBuilder
  delete(path: string): InquiryBuilder
  patch(path: string): InquiryBuilder
  inquire(method: string, path: string): InquiryBuilder
}
