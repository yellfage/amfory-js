import type { Events } from '../events'

import type { Logger } from '../logging'

import type { RequestShape } from '../request-shape'

import type { EventEmitter } from './event-emitter'

import { Request } from './request'

export class RequestFactory {
  private readonly logger: Logger

  private readonly eventEmitter: EventEmitter<Events>

  public constructor(logger: Logger, eventEmitter: EventEmitter<Events>) {
    this.logger = logger
    this.eventEmitter = eventEmitter
  }

  public create(shape: RequestShape): Request {
    return new Request(shape, this.logger, this.eventEmitter)
  }
}
