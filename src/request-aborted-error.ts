import { OperationAbortedError } from './operation-aborted-error'

export class RequestAbortedError extends OperationAbortedError {
  public constructor(message = 'Request aborted') {
    super(message)

    super.name = 'RequestAbortedError'
  }
}
