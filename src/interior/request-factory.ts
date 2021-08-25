import { Logger } from '../logging'
import { EventEmitter } from './event-emitter'
import { Events } from '../events'
import { RequestShape } from '../request-shape'
import { Request } from './request'

export class RequestFactory {
  private logger: Logger
  private eventEmitter: EventEmitter<Events>

  public constructor(logger: Logger, eventEmitter: EventEmitter<Events>) {
    this.logger = logger
    this.eventEmitter = eventEmitter
  }

  public create(shape: RequestShape): Request {
    return new Request(shape, this.logger, this.eventEmitter)
  }
}
