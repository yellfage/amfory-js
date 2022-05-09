import type { RetryControlBuilder, RetryDelaySchemeBuilder } from '../../retry'

import type { InquirySettings } from './inquiry-settings'

export interface InquirySettingsBuilder {
  putHeaders(init: HeadersInit): this
  joinHeaders(init: HeadersInit): this
  setRejectionDelay(delay: number): this
  setAttemptRejectionDelay(delay: number): this
  setRetryControlBuilder(builder: RetryControlBuilder): this
  setRetryDelaySchemeBuilder(builder: RetryDelaySchemeBuilder): this
  build(): InquirySettings
  clone(): InquirySettingsBuilder
}
