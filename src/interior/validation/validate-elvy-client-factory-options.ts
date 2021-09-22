import type { ElvyClientFactoryOptions } from '../../elvy-client-factory-options'

import { validateLoggingSettings } from './validate-logging-settings'

import { validateRequestSettings } from './validate-request-settings'

export function validateElvyClientFactoryOptions(
  options: ElvyClientFactoryOptions
): void {
  validateLoggingSettings(options.logging)
  validateRequestSettings(options.request)
}
