import { HttpStatus } from '../../http-status'
import { RequestSettings } from '../request-settings'
import { RequestRetryConfirmationCallback } from '../../request-retry-confirmation-callback'
import { RequestResolveConfirmationCallback } from '../../request-resolve-confirmation-callback'

export class DefaultRequestSettings implements RequestSettings {
  public headersInit: HeadersInit
  public rejectionDelay: number
  public attemptRejectionDelay: number
  public retryDelays: number[]
  public minRetryDelayAddition: number
  public maxRetryDelayAddition: number
  public maxRetriesAfterDelays: number
  public confirmRetry: RequestRetryConfirmationCallback
  public confirmResolve: RequestResolveConfirmationCallback

  public constructor() {
    this.headersInit = new Headers()
    this.rejectionDelay = 30000
    this.attemptRejectionDelay = 10000
    this.retryDelays = [1000, 2000, 5000]
    this.minRetryDelayAddition = 0
    this.maxRetryDelayAddition = 0
    this.maxRetriesAfterDelays = 0
    this.confirmRetry = (status) => status === HttpStatus.InternalServerError
    this.confirmResolve = (result) =>
      result.status < HttpStatus.InternalServerError
  }
}
