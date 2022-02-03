import type { LoggerBuilder } from '../logging'

import type { LoggingSettings } from './logging-settings'

export interface LoggingSettingBuilder {
  setLoggerBuilder(builder: LoggerBuilder): this
  build(): LoggingSettings
}
