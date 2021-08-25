import { Events } from './events'
import { RequestOptions } from './request-options'
import { RequestResult } from './request-result'
import { RequestSetup } from './request-setup'

export interface ElvyClient {
  on<TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ): Events[TEventName]

  off<TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ): void

  get<TResult = any>(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  head<TResult = any>(
    url: string,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  post<TPayload = any, TResult = any>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  put<TPayload = any, TResult = any>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  delete<TPayload = any, TResult = any>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  patch<TPayload = any, TResult = any>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ): Promise<RequestResult<TResult>>

  request<TPayload = any, TResult = any>(
    setup: RequestSetup<TPayload>
  ): Promise<RequestResult<TResult>>
}
