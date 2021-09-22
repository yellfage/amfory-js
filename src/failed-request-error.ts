import type { RequestResult } from './request-result'

export class FailedRequestError extends Error {
  private readonly result: RequestResult

  public constructor(result: RequestResult) {
    super(
      `Request failed. Status: ${result.status}. Status text: ${result.statusText}`
    )

    super.name = 'FailedRequestError'

    this.result = result
  }

  public getResult<TData = unknown>(): RequestResult<TData> {
    return this.result as RequestResult<TData>
  }
}
