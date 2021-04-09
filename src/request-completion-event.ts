import { RequestResult } from './request-result'
import { RequestSetup } from './request-setup'

export type RequestCompletionEvent<
  TResultPayload = any,
  TSetupPayload = any
> = {
  readonly result: RequestResult<TResultPayload>
  readonly setup: RequestSetup<TSetupPayload>
}
