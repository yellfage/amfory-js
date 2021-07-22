import { RequestResult } from './request-result'

export type RequestRetryConfirmationCallback = (
  result: RequestResult
) => boolean
