import type { EventHandlerMap } from '../event-handler-map'

import type { Logger } from '../logging'

import type { RequestShape } from '../request-shape'

import type { EventEmitter } from './event-emitter'

import { Request } from './request'

export class RequestFactory {
  private readonly logger: Logger

  private readonly eventEmitter: EventEmitter<EventHandlerMap>

  public constructor(
    logger: Logger,
    eventEmitter: EventEmitter<EventHandlerMap>
  ) {
    this.logger = logger
    this.eventEmitter = eventEmitter
  }

  public create(shape: RequestShape): Request {
    return new Request(shape, this.logger, this.eventEmitter)
  }
}
