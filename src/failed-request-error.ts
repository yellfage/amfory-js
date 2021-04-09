import { RequestResult } from './request-result'

export class FailedRequestError extends Error {
  public result: RequestResult

  public constructor(result: RequestResult, message?: string) {
    super(message)

    super.name = 'FailedRequestError'

    this.result = result
  }
}
