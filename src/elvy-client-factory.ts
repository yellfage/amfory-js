import { ElvyClientFactoryOptions } from './elvy-client-factory-options'
import { ElvyClient } from './elvy-client'

import {
  FunctionUtils,
  EventEmitter,
  RequestShapeFactory,
  Client,
  ElvyClientFactoryOptionsValidator,
  RequestFactory
} from './interior'

import { Events } from './events'

export class ElvyClientFactory {
  public create(
    configure?: (options: ElvyClientFactoryOptions) => void
  ): ElvyClient {
    if (configure !== undefined && !FunctionUtils.isFunction(configure)) {
      throw new TypeError(
        'Invalid type of the "configure" parameter. Expected type: function'
      )
    }

    const options = new ElvyClientFactoryOptions()

    if (configure) {
      configure(options)
    }

    ElvyClientFactoryOptionsValidator.validate(options)

    return this.createCore(options)
  }

  private createCore(options: ElvyClientFactoryOptions): ElvyClient {
    const eventEmitter = new EventEmitter<Events>()

    const requestShapeFactory = new RequestShapeFactory(
      options.request.baseUrl,
      options.request.rejectionDelay,
      options.request.attemptRejectionDelay,
      options.request.retryPolicy,
      options.request.headers,
      options.request.confirmResolve
    )

    const requestFactory = new RequestFactory(
      options.logging.logger,
      eventEmitter
    )

    return new Client(eventEmitter, requestShapeFactory, requestFactory)
  }
}
