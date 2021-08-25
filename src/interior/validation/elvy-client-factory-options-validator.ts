import { ElvyClientFactoryOptions } from '../../elvy-client-factory-options'
import { LoggingSettingsValidator } from './logging-settings-validator'
import { RequestSettingsValidator } from './request-settings-validator'

export class ElvyClientFactoryOptionsValidator {
  public static validate(options: ElvyClientFactoryOptions): void {
    LoggingSettingsValidator.validate(options.logging)
    RequestSettingsValidator.validate(options.request)
  }
}
