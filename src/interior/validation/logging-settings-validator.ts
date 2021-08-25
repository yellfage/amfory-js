import { LoggingSettings } from '../../configuration'

export class LoggingSettingsValidator {
  public static validate(settings: LoggingSettings): void {
    const { logger } = settings

    if (logger == null) {
      throw TypeError(
        'Invalid logging settings: the "logger" field cannot be a null or undefined'
      )
    }
  }
}
