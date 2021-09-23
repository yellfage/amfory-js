import type { ElvyClient } from './elvy-client'

import { ElvyClientFactoryOptions } from './elvy-client-factory-options'

import type { EventHandlerMap } from './event-handler-map'

import {
  EventEmitter,
  RequestShapeFactory,
  Client,
  RequestFactory,
  isFunction,
  validateElvyClientFactoryOptions
} from './interior'

export class ElvyClientFactory {
  public create(
    configure: (options: ElvyClientFactoryOptions) => void = () => {}
  ): ElvyClient {
    if (!isFunction(configure)) {
      throw new TypeError(
        'Invalid type of the "configure" parameter. Expected type: function'
      )
    }

    const options = new ElvyClientFactoryOptions()

    configure(options)

    validateElvyClientFactoryOptions(options)

    return this.createCore(options)
  }

  private createCore(options: ElvyClientFactoryOptions): ElvyClient {
    const eventEmitter = new EventEmitter<EventHandlerMap>()

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
