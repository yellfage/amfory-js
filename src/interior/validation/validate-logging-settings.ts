/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { LoggingSettings } from '../../configuration'

export function validateLoggingSettings({ logger }: LoggingSettings): void {
  if (logger == null) {
    throw new TypeError(
      'Invalid logging settings: the "logger" field cannot be a null or undefined'
    )
  }
}
