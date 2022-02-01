export class FailedAccessRefreshError extends Error {
  public constructor(message: string) {
    super(message)

    super.name = 'FailedAccessRefreshError'
  }
}
