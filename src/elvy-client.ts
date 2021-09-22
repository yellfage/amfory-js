import type { Events } from './events'

import type { RequestOptions } from './request-options'

import type { RequestResult } from './request-result'

import type { RequestSetup } from './request-setup'

export interface ElvyClient {
  on: <TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ) => Events[TEventName]

  off: <TEventName extends keyof Events>(
    eventName: TEventName,
    handler: Events[TEventName]
  ) => void

  get: <TResult = unknown>(
    url: string,
    options?: RequestOptions
  ) => Promise<RequestResult<TResult>>

  head: (url: string, options?: RequestOptions) => Promise<RequestResult>

  post: <TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ) => Promise<RequestResult<TResult>>

  put: <TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ) => Promise<RequestResult<TResult>>

  delete: <TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ) => Promise<RequestResult<TResult>>

  patch: <TPayload = unknown, TResult = unknown>(
    url: string,
    payload?: TPayload,
    options?: RequestOptions
  ) => Promise<RequestResult<TResult>>

  request: <TPayload = unknown, TResult = unknown>(
    setup: RequestSetup<TPayload>
  ) => Promise<RequestResult<TResult>>
}
