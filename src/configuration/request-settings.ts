import { RequestRetryPolicy } from './request-retry-policy'
import { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'
import { DefaultRequestRetryPolicy } from './default-request-retry-policy'
import { HttpStatus } from '../http-status'

export class RequestSettings {
  public baseUrl: string
  public headers: HeadersInit
  public rejectionDelay: number
  public attemptRejectionDelay: number
  public retryPolicy: RequestRetryPolicy
  public confirmResolve: RequestResolveConfirmationCallback

  public constructor(
    baseUrl = '',
    headers = new Headers(),
    rejectionDelay = 90000,
    attemptRejectionDelay = 15000,
    retryPolicy = new DefaultRequestRetryPolicy(),
    confirmResolve: RequestResolveConfirmationCallback = (result) =>
      result.status < HttpStatus.InternalServerError
  ) {
    this.baseUrl = baseUrl
    this.headers = headers
    this.rejectionDelay = rejectionDelay
    this.attemptRejectionDelay = attemptRejectionDelay
    this.retryPolicy = retryPolicy
    this.confirmResolve = confirmResolve
  }
}
