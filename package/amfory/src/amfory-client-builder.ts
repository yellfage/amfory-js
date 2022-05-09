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
  FormDataInquiryPayloadFactory,
  BlobInquiryPayloadFactory,
  JsonInquiryPayloadFactory,
  TextInquiryPayloadFactory,
  BasicLoggingSettingsBuilder,
  BasicInquirySettingsBuilder,
  BasicInquiryShapeFactory,
  ArrayBufferInquiryPayloadFactory,
  BasicAmforyClient,
  BasicInquiringEventFactory,
  BasicRetryingEventFactory,
  BasicReplyingEventFactory,
} from './interior'

export class AmforyClientBuilder {
  private readonly url: URL

  private readonly loggingSettingsBuilder: LoggingSettingsBuilder

  private readonly inquirySettingsBuilder: InquirySettingsBuilder

  public constructor(url: string | URL)
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingsBuilder,
    inquirySettingsBuilder: InquirySettingsBuilder,
  )
  public constructor(
    url: string | URL,
    loggingSettingsBuilder: LoggingSettingsBuilder = new BasicLoggingSettingsBuilder(),
    inquirySettingsBuilder: InquirySettingsBuilder = new BasicInquirySettingsBuilder(),
  ) {
    this.url = new URL(url)
    this.loggingSettingsBuilder = loggingSettingsBuilder
    this.inquirySettingsBuilder = inquirySettingsBuilder
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

    const inquiringEventChannel = new BasicEventChannel<InquiringEventHandler>()
    const replyingEventChannel = new BasicEventChannel<ReplyingEventHandler>()
    const retryingEventChannel = new BasicEventChannel<RetryingEventHandler>()

    const inquiryShapeFactory = new BasicInquiryShapeFactory()

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
      this.url,
      inquirySettings.headers,
      inquirySettings.rejectionDelay,
      inquirySettings.attemptRejectionDelay,
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
      pluginBuilders,
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
      inquiringEventChannel,
      replyingEventChannel,
      retryingEventChannel,
      pluginBuilders,
      inquiryBuilderFactory,
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
