import { RequestResult } from './request-result'
import { RequestShape } from './request-shape'

export type RequestCompletionEvent<TResultPayload = any, TShapePayload = any> =
  {
    readonly result: RequestResult<TResultPayload>
    readonly shape: RequestShape<TShapePayload>
  }
