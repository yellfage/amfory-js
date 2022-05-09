import { BasicEventChannel } from '@yellfage/events'

import type { AmforyClient } from './amfory-client'

import type {
  LoggingSettingsBuilder,
  InquirySettingsBuilder,
} from './configuration'

import type {
  InquiringEventHandler,
  ReplyingEventHandler,
  RetryingEventHandler,
} from './event'

import {
  BasicReplyFactory,
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  BasicInquiryFactory,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
  BasicInquiryBuilderFactory,
  BasicLoggingSettingsBuilder,
  BasicInquirySettingsBuilder,
  BasicAmforyClient,
  BasicInquiringEventFactory,
  BasicRetryingEventFactory,
  BasicReplyingEventFactory,
  FormDataPayloadFactory,
  ArrayBufferPayloadFactory,
  BlobPayloadFactory,
  JsonPayloadFactory,
  TextPayloadFactory,
} from './interior'

import type { ClientPluginBuilder } from './plugin'

export class AmforyClientBuilder {
  private readonly url: string | URL

  private readonly loggingSettingsBuilder: LoggingSettingsBuilder

  private readonly inquirySettingsBuilder: InquirySettingsBuilder

  private readonly pluginBuilders: ClientPluginBuilder[]

  public constructor(url: string | URL)
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingsBuilder,
    inquirySettingsBuilder: InquirySettingsBuilder,
    pluginBuilders: ClientPluginBuilder[],
  )
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingsBuilder = new BasicLoggingSettingsBuilder(),
    inquirySettingsBuilder: InquirySettingsBuilder = new BasicInquirySettingsBuilder(),
    pluginBuilders: ClientPluginBuilder[] = [],
  ) {
    this.url = url
    this.loggingSettingsBuilder = loggingSettingsBuilder
    this.inquirySettingsBuilder = inquirySettingsBuilder
    this.pluginBuilders = pluginBuilders
  }

  public use(builder: ClientPluginBuilder): this {
    this.pluginBuilders.push(builder)

    return this
  }

  public configureLogging(
    configure: (builder: LoggingSettingsBuilder) => void,
  ): this {
    configure(this.loggingSettingsBuilder)

    return this
  }

  public configureInquiry(
    configure: (builder: InquirySettingsBuilder) => void,
  ): this {
    configure(this.inquirySettingsBuilder)

    return this
  }

  public build(): AmforyClient {
    const loggingSettings = this.loggingSettingsBuilder.build()
    const inquirySettings = this.inquirySettingsBuilder.build()

    const url = new URL(this.url)

    const formDataPayloadFactory = new FormDataPayloadFactory()
    const arrayBufferPayloadFactory = new ArrayBufferPayloadFactory()
    const blobPayloadFactory = new BlobPayloadFactory()
    const jsonPayloadFactory = new JsonPayloadFactory()
    const textPayloadFactory = new TextPayloadFactory()

    const replyBodyArrayBufferReader = new ReplyBodyArrayBufferReader()
    const replyBodyBlobReader = new ReplyBodyBlobReader()
    const replyBodyFormDataReader = new ReplyBodyFormDataReader()
    const replyBodyJsonReader = new ReplyBodyJsonReader()
    const replyBodyTextReader = new ReplyBodyTextReader()

    const inquiringEventChannel = new BasicEventChannel<InquiringEventHandler>()
    const replyingEventChannel = new BasicEventChannel<ReplyingEventHandler>()
    const retryingEventChannel = new BasicEventChannel<RetryingEventHandler>()

    const replyFactory = new BasicReplyFactory()
    const inquiringEventFactory = new BasicInquiringEventFactory()
    const retryingEventFactory = new BasicRetryingEventFactory()
    const replyingEventFactory = new BasicReplyingEventFactory()

    const inquiryFactory = new BasicInquiryFactory(
      replyFactory,
      inquirySettings.retryControl,
      inquirySettings.retryDelayScheme,
      inquiringEventFactory,
      retryingEventFactory,
      replyingEventFactory,
      loggingSettings.logger,
    )

    const inquiryBuilderFactory = new BasicInquiryBuilderFactory(
      url,
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
      inquirySettings.rejectionDelay,
      inquirySettings.attemptRejectionDelay,
      arrayBufferPayloadFactory,
      blobPayloadFactory,
      formDataPayloadFactory,
      jsonPayloadFactory,
      textPayloadFactory,
      replyBodyArrayBufferReader,
      replyBodyBlobReader,
      replyBodyFormDataReader,
      replyBodyJsonReader,
      replyBodyTextReader,
      inquiryFactory,
    )

    const client = new BasicAmforyClient(
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
      inquiryBuilderFactory,
    )

    this.pluginBuilders.forEach((builder) => client.use(builder))

    return client
  }

  public clone(url: string | URL): AmforyClientBuilder {
    return new AmforyClientBuilder(
      url,
      this.loggingSettingsBuilder.clone(),
      this.inquirySettingsBuilder.clone(),
      this.pluginBuilders.slice(),
    )
  }
}
