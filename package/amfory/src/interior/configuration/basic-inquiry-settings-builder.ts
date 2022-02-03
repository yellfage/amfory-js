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
  private headers: Headers = new Headers()

  private rejectionDelay = 90000

  private attemptRejectionDelay = 15000

  private retryControlBuilder: RetryControlBuilder =
    new BasicRetryControlBuilder()

  private retryDelaySchemeBuilder: RetryDelaySchemeBuilder =
    new BasicRetryDelaySchemeBuilder()

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
}
