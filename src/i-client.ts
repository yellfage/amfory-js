import { IEventHandlerStore } from './i-event-handler-store'
import { RequestCompletionEventHandler } from './request-completion-event-handler'
import { RequestEventHandler } from './request-event-handler'
import { RequestOptions } from './request-options'
import { RequestRetryEventHandler } from './request-retry-event-handler'
import { RequestResult } from './request-result'
import { RequestSetup } from './request-setup'

export interface IClient {
  readonly request: IEventHandlerStore<RequestEventHandler>
  readonly requestCompletion: IEventHandlerStore<RequestCompletionEventHandler>
  readonly requestRetry: IEventHandlerStore<RequestRetryEventHandler>

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

  send<TPayload = any, TResult = any>(
    setup: RequestSetup<TPayload>
  ): Promise<RequestResult<TResult>>
}
