import { ClientOptions } from './client-options'
import { IClient } from './i-client'

import { DefaultLoggingSettings } from './settings/internal/default-logging-settings'
import { DefaultRequestSettings } from './settings/internal/default-requets-settings'
import { Client } from './internal/client'
import { RequestSettings } from './settings'

// TODO: validate options
export class ClientBuilder {
  public build(options?: ClientOptions): IClient {
    options = {
      logging: { ...new DefaultLoggingSettings(), ...options?.logging },
      request: { ...new DefaultRequestSettings(), ...options?.request }
    }

    return new Client(
      options.request as RequestSettings,
      options.logging!.logger!
    )
  }
}
