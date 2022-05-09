import type { AmforyClient } from '../amfory-client'

import type { InquiryBuilder } from '../inquiry'

import type { ClientPluginBuilder } from '../plugin'

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

  private readonly inquiryBuilderFactory: InquiryBuilderFactory

  public constructor(
    inquiringEventChannel: InquiringEventChannel,
    replyingEventChannel: ReplyingEventChannel,
    retryingEventChannel: RetryingEventChannel,
    inquiryBuilderFactory: InquiryBuilderFactory,
  ) {
    this.inquiring = inquiringEventChannel
    this.replying = replyingEventChannel
    this.retrying = retryingEventChannel
    this.inquiryBuilderFactory = inquiryBuilderFactory
  }

  public use(builder: ClientPluginBuilder): this {
    builder.build().initialize(this)

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
