import type { AmforyClient } from '../amfory-client'

import type { InquiryBuilder } from '../inquiry'

import type { PluginBuilder } from '../plugin'

import type {
  InquiringEventChannel,
  ReplyingEventChannel,
  RetryingEventChannel,
} from './event'

import type { InquiryBuilderFactory } from './inquiry'

export class BasicAmforyClient implements AmforyClient {
  public readonly inquiring: InquiringEventChannel

  public readonly replying: ReplyingEventChannel

  public readonly retrying: RetryingEventChannel

  private readonly pluginBuilders: PluginBuilder[]

  private readonly inquiryBuilderFactory: InquiryBuilderFactory

  public constructor(
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    pluginBuilders: PluginBuilder[],
    inquiryBuilderFactory: InquiryBuilderFactory,
  ) {
    this.inquiring = inquiringEventChannel
    this.replying = replyingEventChannel
    this.retrying = retryingEventChannel
    this.pluginBuilders = pluginBuilders
    this.inquiryBuilderFactory = inquiryBuilderFactory
  }

  public use(builder: PluginBuilder): this {
    this.pluginBuilders.push(builder)

    return this
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
