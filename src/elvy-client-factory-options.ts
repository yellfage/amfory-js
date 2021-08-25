import { LoggingSettings, RequestSettings } from './configuration'

export class ElvyClientFactoryOptions {
  public logging: LoggingSettings
  public request: RequestSettings

  public constructor(
    logging = new LoggingSettings(),
    request = new RequestSettings()
  ) {
    this.logging = logging
    this.request = request
  }
}
