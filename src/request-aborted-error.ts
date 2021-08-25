export class RequestAbortedError extends Error {
  public constructor(message = 'The request aborted') {
    super(message)

    super.name = 'RequestAbortedError'
  }
}
