import { RequestShape } from './request-shape'
import { RequestResult } from './request-result'

export interface RequestResultEvent {
  readonly shape: RequestShape
  readonly result: RequestResult
}
