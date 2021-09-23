import type { ElvyClient } from '../elvy-client'

import type { EventHandlerMap } from '../event-handler-map'

import type { RequestOptions } from '../request-options'

import type { RequestResult } from '../request-result'

import type { RequestSetup } from '../request-setup'

import type { EventEmitter } from './event-emitter'

import type { RequestFactory } from './request-factory'

import type { RequestShapeFactory } from './request-shape-factory'

import { validateRequestSetup } from './validation'

export class Client implements ElvyClient {
  private readonly eventEmitter: EventEmitter<EventHandlerMap>

  private readonly requestShapeFactory: RequestShapeFactory

  private readonly requestFactory: RequestFactory

  public constructor(
    eventEmitter: EventEmitter<EventHandlerMap>,
    requestShapeFactory: RequestShapeFactory,
    requestFactory: RequestFactory
  ) {
    this.eventEmitter = eventEmitter
    this.requestShapeFactory = requestShapeFactory
    this.requestFactory = requestFactory
  }

  public on<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName]
  ): EventHandlerMap[TEventName] {
    return this.eventEmitter.on(eventName, handler)
  }

  public off<TEventName extends keyof EventHandlerMap>(
    eventName: TEventName,
    handler: EventHandlerMap[TEventName]
  ): void {
    this.eventEmitter.off(eventName, handler)
  }

  public async get<TResult = unknown>(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>> {
    return this.request<TResult>({ url, method: 'GET', ...options })
  }

  public async head(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult> {
    return this.request({ url, method: 'HEAD', ...options })
  }

  public async post<TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>> {
    return this.request<TResult>({ url, method: 'POST', payload, ...options })
  }

  public async put<TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>> {
    return this.request<TResult>({ url, method: 'PUT', payload, ...options })
  }

  public async delete<TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>> {
    return this.request<TResult>({ url, method: 'DELETE', payload, ...options })
  }

  public async patch<TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>> {
    return this.request<TResult>({ url, method: 'PATCH', payload, ...options })
  }

  public async request<TResult>(
    setup: RequestSetup
  ): Promise<RequestResult<TResult>> {
    validateRequestSetup(setup)

    const shape = this.requestShapeFactory.create(setup)

    return this.requestFactory.create(shape).perform<TResult>()
  }
}
