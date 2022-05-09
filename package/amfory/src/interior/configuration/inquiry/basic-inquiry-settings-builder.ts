import type {
  InquirySettingsBuilder,
  InquirySettings,
} from '../../../configuration'

import type {
  RetryControlBuilder,
  RetryDelaySchemeBuilder,
} from '../../../retry'

import {
  BasicRetryControlBuilder,
  BasicRetryDelaySchemeBuilder,
} from '../../../retry'

import { BasicInquirySettings } from './basic-inquiry-settings'

export class BasicInquirySettingsBuilder implements InquirySettingsBuilder {
  private readonly headers: Headers

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

  public putHeaders(init: HeadersInit): this {
    new Headers(init).forEach((value, key) => this.headers.set(key, value))

    return this
  }

  public joinHeaders(init: HeadersInit): this {
    new Headers(init).forEach((value, key) => this.headers.append(key, value))

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
    return new BasicInquirySettings(
      this.headers,
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.retryControlBuilder.build(),
      this.retryDelaySchemeBuilder.build(),
    )
  }

  public clone(): InquirySettingsBuilder {
    return new BasicInquirySettingsBuilder(
      new Headers(this.headers),
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.retryControlBuilder.clone(),
      this.retryDelaySchemeBuilder.clone(),
    )
  }
}
