import { RequestResult } from './request-result'

export class FailedRequestError extends Error {
  public result: RequestResult

  public constructor(
    result: RequestResult,
    message = `Request failed with status: ${result.status}`
  ) {
    super(message)

    super.name = 'FailedRequestError'

    this.result = result
  }
}
