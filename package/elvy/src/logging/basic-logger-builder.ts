import { BasicLogger } from './basic-logger'

import { LogLevel } from './log-level'

import type { LoggerBuilder } from './logger-builder'

export class BasicLoggerBuilder implements LoggerBuilder {
  private level = LogLevel.Trace

  public setLevel(level: LogLevel): this {
    this.level = level

    return this
  }

  public build(): BasicLogger {
    return new BasicLogger(this.level)
  }
}
