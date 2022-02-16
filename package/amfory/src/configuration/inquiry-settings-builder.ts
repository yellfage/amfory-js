import type { RetryControlBuilder, RetryDelaySchemeBuilder } from '../retry'

import type { InquirySettings } from './inquiry-settings'

export interface InquirySettingBuilder {
  setHeaders(init: HeadersInit): this
  setRejectionDelay(delay: number): this
  setAttemptRejectionDelay(delay: number): this
  setRetryControlBuilder(builder: RetryControlBuilder): this
  setRetryDelaySchemeBuilder(builder: RetryDelaySchemeBuilder): this
  build(): InquirySettings
  clone(): InquirySettingBuilder
}
