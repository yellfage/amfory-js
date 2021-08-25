import { RequestResult } from './request-result'

export class FailedRequestError extends Error {
  private result: RequestResult

  public constructor(result: RequestResult) {
    super(
      `Request failed. Status: ${result.status}. Status text: ${result.statusText}`
    )

    super.name = 'FailedRequestError'

    this.result = result
  }

  public getResult<TData = any>(): RequestResult<TData> {
    return this.result
  }
}
