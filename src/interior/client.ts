/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ElvyClient } from '../elvy-client'
import { EventEmitter } from './event-emitter'
import { RequestShapeFactory } from './request-shape-factory'
import { RequestFactory } from './request-factory'
import { Events } from '../events'
import { RequestOptions } from '../request-options'
import { RequestResult } from '../request-result'
import { RequestSetup } from '../request-setup'
import { RequestSetupValidator } from './validation'

export class Client implements ElvyClient {
  private readonly eventEmitter: EventEmitter<Events>
  private readonly requestShapeFactory: RequestShapeFactory
  private readonly requestFactory: RequestFactory

  public constructor(
    eventEmitter: EventEmitter<Events>,
    requestShapeFactory: RequestShapeFactory,
    requestFactory: RequestFactory
  ) {
    this.eventEmitter = eventEmitter
    this.requestShapeFactory = requestShapeFactory
    this.requestFactory = requestFactory
  }

  public on<TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ): Events[TEventName] {
    return this.eventEmitter.on(eventName, handler)
  }

  public off<TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ): void {
    this.eventEmitter.off(eventName, handler)
  }

  public get(url: string, options?: RequestOptions): Promise<RequestResult> {
    return this.request({ url, method: 'GET', ...options })
  }

  public head(url: string, options?: RequestOptions): Promise<RequestResult> {
    return this.request({ url, method: 'HEAD', ...options })
  }

  public post(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return this.request({ url, method: 'POST', payload, ...options })
  }

  public put(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return this.request({ url, method: 'PUT', payload, ...options })
  }

  public delete(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return this.request({ url, method: 'DELETE', payload, ...options })
  }

  public patch(
    url: string,
    payload?: any,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return this.request({ url, method: 'PATCH', payload, ...options })
  }

  public request(setup: RequestSetup): Promise<RequestResult> {
    RequestSetupValidator.validate(setup)

    const shape = this.requestShapeFactory.create(setup)

    return this.requestFactory.create(shape).perform()
  }
}
