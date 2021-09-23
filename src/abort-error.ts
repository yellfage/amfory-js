export class AbortError extends Error {
  public constructor(message = 'The request aborted') {
    super(message)

    super.name = 'AbortError'
  }
}
