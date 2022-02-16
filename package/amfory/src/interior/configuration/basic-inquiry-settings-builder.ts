import type {
  InquirySettingBuilder,
  InquirySettings,
} from '../../configuration'

import type { RetryControlBuilder, RetryDelaySchemeBuilder } from '../../retry'

import {
  BasicRetryControlBuilder,
  BasicRetryDelaySchemeBuilder,
} from '../../retry'

export class BasicInquirySettingBuilder implements InquirySettingBuilder {
  private headers: Headers

  private rejectionDelay: number

  private attemptRejectionDelay: number

  private retryControlBuilder: RetryControlBuilder

  private retryDelaySchemeBuilder: RetryDelaySchemeBuilder

  public constructor()
  public constructor(
    headers: Headers,
    rejectionDelay: number,
    attemptRejectionDelay: number,
    retryControlBuilder: RetryControlBuilder,
    retryDelaySchemeBuilder: RetryDelaySchemeBuilder,
  )
  public constructor(
    headers = new Headers(),
    rejectionDelay = 90000,
    attemptRejectionDelay = 15000,
    retryControlBuilder: RetryControlBuilder = new BasicRetryControlBuilder(),
    retryDelaySchemeBuilder: RetryDelaySchemeBuilder = new BasicRetryDelaySchemeBuilder(),
  ) {
    this.headers = headers
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.retryControlBuilder = retryControlBuilder
    this.retryDelaySchemeBuilder = retryDelaySchemeBuilder
  }

  public setHeaders(init: HeadersInit): this {
    this.headers = new Headers(init)

    return this
  }

  public setRejectionDelay(delay: number): this {
    this.rejectionDelay = delay

    return this
  }

  public setAttemptRejectionDelay(delay: number): this {
    this.attemptRejectionDelay = delay

    return this
  }

  public setRetryControlBuilder(builder: RetryControlBuilder): this {
    this.retryControlBuilder = builder

    return this
  }

  public setRetryDelaySchemeBuilder(builder: RetryDelaySchemeBuilder): this {
    this.retryDelaySchemeBuilder = builder

    return this
  }

  public build(): InquirySettings {
    return {
      headers: this.headers,
      rejectionDelay: this.rejectionDelay,
      attemptRejectionDelay: this.attemptRejectionDelay,
      retryControl: this.retryControlBuilder.build(),
      retryDelayScheme: this.retryDelaySchemeBuilder.build(),
    }
  }

  public clone(): InquirySettingBuilder {
    return new BasicInquirySettingBuilder(
      new Headers(this.headers),
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.retryControlBuilder.clone(),
      this.retryDelaySchemeBuilder.clone(),
    )
  }
}
