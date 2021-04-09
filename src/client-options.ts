import { LoggingSettings, RequestSettings } from './settings'

export type ClientOptions = {
  logging?: Partial<LoggingSettings>
  request?: Partial<RequestSettings>
}
