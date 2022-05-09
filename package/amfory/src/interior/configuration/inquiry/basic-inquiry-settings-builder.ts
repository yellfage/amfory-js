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
  private rejectionDelay: number

  private attemptRejectionDelay: number

  private retryControlBuilder: RetryControlBuilder

  private retryDelaySchemeBuilder: RetryDelaySchemeBuilder

  public constructor()
  public constructor(
    rejectionDelay: number,
    attemptRejectionDelay: number,
    retryControlBuilder: RetryControlBuilder,
    retryDelaySchemeBuilder: RetryDelaySchemeBuilder,
  )
  public constructor(
    rejectionDelay = 90000,
    attemptRejectionDelay = 15000,
    retryControlBuilder: RetryControlBuilder = new BasicRetryControlBuilder(),
    retryDelaySchemeBuilder: RetryDelaySchemeBuilder = new BasicRetryDelaySchemeBuilder(),
  ) {
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.retryControlBuilder = retryControlBuilder
    this.retryDelaySchemeBuilder = retryDelaySchemeBuilder
  }

  public setRejectionDelay(delay: number): this {
    this.rejectionDelay = delay

    return this
  }

  public setAttemptRejectionDelay(delay: number): this {
    this.attemptRejectionDelay = delay

    return this
  }

  public setRetryControl(builder: RetryControlBuilder): this {
    this.retryControlBuilder = builder

    return this
  }

  public setRetryDelayScheme(builder: RetryDelaySchemeBuilder): this {
    this.retryDelaySchemeBuilder = builder

    return this
  }

  public build(): InquirySettings {
    return new BasicInquirySettings(
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.retryControlBuilder.build(),
      this.retryDelaySchemeBuilder.build(),
    )
  }

  public clone(): InquirySettingsBuilder {
    return new BasicInquirySettingsBuilder(
      this.rejectionDelay,
      this.attemptRejectionDelay,
      this.retryControlBuilder.clone(),
      this.retryDelaySchemeBuilder.clone(),
    )
  }
}
