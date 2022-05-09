import type { RetryControlBuilder, RetryDelaySchemeBuilder } from '../../retry'

import type { InquirySettings } from './inquiry-settings'

export interface InquirySettingsBuilder {
  setRejectionDelay(delay: number): this
  setAttemptRejectionDelay(delay: number): this
  setRetryControl(builder: RetryControlBuilder): this
  setRetryDelayScheme(builder: RetryDelaySchemeBuilder): this
  build(): InquirySettings
  clone(): InquirySettingsBuilder
}
