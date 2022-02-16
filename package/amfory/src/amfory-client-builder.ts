import { EventEmitter } from '@yellfage/event-emitter'

import type { AmforyClient } from './amfory-client'

import type {
  LoggingSettingBuilder,
  InquirySettingBuilder,
} from './configuration'

import type { EventHandlerMap } from './event-handler-map'

import {
  BasicReplyFactory,
  ReplyBodyArrayBufferReader,
  ReplyBodyBlobReader,
  BasicInquiryFactory,
  ReplyBodyFormDataReader,
  ReplyBodyJsonReader,
  ReplyBodyTextReader,
  BasicInquiryBuilderFactory,
  FormDataInquiryPayloadFactory,
  BlobInquiryPayloadFactory,
  JsonInquiryPayloadFactory,
  TextInquiryPayloadFactory,
  BasicInquiryEventFactory,
  BasicRetryEventFactory,
  BasicReplyEventFactory,
  BasicRetryContextFactory,
  BasicLoggingSettingBuilder,
  BasicInquirySettingBuilder,
  BasicInquiryShapeFactory,
  ArrayBufferInquiryPayloadFactory,
  BasicAmforyClient,
} from './interior'

export class AmforyClientBuilder {
  private readonly url: URL

  private readonly loggingSettingsBuilder: LoggingSettingBuilder

  private readonly inquirySettingsBuilder: InquirySettingBuilder

  public constructor(url: string | URL)
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingBuilder,
    inquirySettingsBuilder: InquirySettingBuilder,
  )
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingBuilder = new BasicLoggingSettingBuilder(),
    inquirySettingsBuilder: InquirySettingBuilder = new BasicInquirySettingBuilder(),
  ) {
    this.url = new URL(url)
    this.loggingSettingsBuilder = loggingSettingsBuilder
    this.inquirySettingsBuilder = inquirySettingsBuilder
  }

  public configureLogging(
    configure: (builder: LoggingSettingBuilder) => void,
  ): this {
    configure(this.loggingSettingsBuilder)

    return this
  }

  public configureInquiry(
    configure: (builder: InquirySettingBuilder) => void,
  ): this {
    configure(this.inquirySettingsBuilder)

    return this
  }

  public build(): AmforyClient {
    const loggingSettings = this.loggingSettingsBuilder.build()
    const inquirySettings = this.inquirySettingsBuilder.build()

    const pluginBuilders = []

    const formDataInquiryPayloadFactory = new FormDataInquiryPayloadFactory()
    const arrayBufferInquiryPayloadFactory =
      new ArrayBufferInquiryPayloadFactory()
    const blobInquiryPayloadFactory = new BlobInquiryPayloadFactory()
    const jsonInquiryPayloadFactory = new JsonInquiryPayloadFactory()
    const textInquiryPayloadFactory = new TextInquiryPayloadFactory()

    const replyBodyArrayBufferReader = new ReplyBodyArrayBufferReader()
    const replyBodyBlobReader = new ReplyBodyBlobReader()
    const replyBodyFormDataReader = new ReplyBodyFormDataReader()
    const replyBodyJsonReader = new ReplyBodyJsonReader()
    const replyBodyTextReader = new ReplyBodyTextReader()

    const eventEmitter = new EventEmitter<EventHandlerMap>()

    const inquiryShapeFactory = new BasicInquiryShapeFactory()

    const replyFactory = new BasicReplyFactory()
    const inquiryEventFactory = new BasicInquiryEventFactory()
    const retryEventFactory = new BasicRetryEventFactory()
    const retryContextFactory = new BasicRetryContextFactory()
    const replyEventFactory = new BasicReplyEventFactory()

    const inquiryFactory = new BasicInquiryFactory(
      replyFactory,
      inquirySettings.retryControl,
      inquirySettings.retryDelayScheme,
      inquiryEventFactory,
      retryEventFactory,
      retryContextFactory,
      replyEventFactory,
      loggingSettings.logger,
    )

    const inquiryBuilderFactory = new BasicInquiryBuilderFactory(
      this.url,
      inquirySettings.headers,
      inquirySettings.rejectionDelay,
      inquirySettings.attemptRejectionDelay,
      pluginBuilders,
      eventEmitter,
      arrayBufferInquiryPayloadFactory,
      blobInquiryPayloadFactory,
      formDataInquiryPayloadFactory,
      jsonInquiryPayloadFactory,
      textInquiryPayloadFactory,
      replyBodyArrayBufferReader,
      replyBodyBlobReader,
      replyBodyFormDataReader,
      replyBodyJsonReader,
      replyBodyTextReader,
      inquiryShapeFactory,
      inquiryFactory,
    )

    return new BasicAmforyClient(
      pluginBuilders,
      inquiryBuilderFactory,
      eventEmitter,
    )
  }

  public clone(url: string | URL = this.url): AmforyClientBuilder {
    return new AmforyClientBuilder(
      url,
      this.loggingSettingsBuilder.clone(),
      this.inquirySettingsBuilder.clone(),
    )
  }
}
