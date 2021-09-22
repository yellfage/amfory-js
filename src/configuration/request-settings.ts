import { HttpStatus } from '../http-status'

import { DefaultRequestRetryPolicy } from './default-request-retry-policy'

import type { RequestResolveConfirmationCallback } from './request-resolve-confirmation-callback'

import type { RequestRetryPolicy } from './request-retry-policy'

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
