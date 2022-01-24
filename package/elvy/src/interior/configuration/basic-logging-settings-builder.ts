import type {
  LoggingSettingBuilder,
  LoggingSettings,
} from '../../configuration'

import type { LoggerBuilder } from '../../logging'

import { BasicLoggerBuilder } from '../../logging'

export class BasicLoggingSettingBuilder implements LoggingSettingBuilder {
  private loggerBuilder: LoggerBuilder = new BasicLoggerBuilder()

  public setLoggerBuilder(builder: LoggerBuilder): this {
    this.loggerBuilder = builder

    return this
  }

  public build(): LoggingSettings {
    return { logger: this.loggerBuilder.build() }
  }
}
