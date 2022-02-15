import type { EventEmitter } from '@yellfage/event-emitter'

import type { AmforyClient } from '../amfory-client'

import type { EventHandlerMap } from '../event-handler-map'

import type { InquiryBuilder } from '../inquiry'

import type { PluginBuilder } from '../plugin'

import type { InquiryBuilderFactory } from './inquiry'

export class BasicAmforyClient implements AmforyClient {
  private readonly pluginBuilders: PluginBuilder[]

  private readonly inquiryBuilderFactory: InquiryBuilderFactory

  private readonly eventEmitter: EventEmitter<EventHandlerMap>

  public constructor(
    pluginBuilders: PluginBuilder[],
    inquiryBuilderFactory: InquiryBuilderFactory,
    eventEmitter: EventEmitter<EventHandlerMap>,
  ) {
    this.pluginBuilders = pluginBuilders
    this.inquiryBuilderFactory = inquiryBuilderFactory
    this.eventEmitter = eventEmitter
  }

  public use(builder: PluginBuilder): this {
    this.pluginBuilders.push(builder)

    return this
  }

  public on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): EventHandlerMap[TEventName] {
    return this.eventEmitter.on(eventName, handler)
  }

  public off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName],
  ): void {
    this.eventEmitter.off(eventName, handler)
  }

  public get(path: string): InquiryBuilder {
    return this.inquire('GET', path)
  }

  public head(path: string): InquiryBuilder {
    return this.inquire('HEAD', path)
  }

  public post(path: string): InquiryBuilder {
    return this.inquire('POST', path)
  }

  public put(path: string): InquiryBuilder {
    return this.inquire('PUT', path)
  }

  public delete(path: string): InquiryBuilder {
    return this.inquire('DELETE', path)
  }

  public patch(path: string): InquiryBuilder {
    return this.inquire('PATCH', path)
  }

  public inquire(method: string, path: string): InquiryBuilder {
    return this.inquiryBuilderFactory.create(method, path)
  }
}
