import { HttpStatus } from '../../http-status'
import { RequestSettings } from '../request-settings'
import { IRequestRetryPolicy } from '../../i-request-retry-policy'
import { DefaultRequestRetryPolicy } from '../../default-request-retry-policy'
import { RequestResolveConfirmationCallback } from '../../request-resolve-confirmation-callback'

export class DefaultRequestSettings implements RequestSettings {
  public baseUrl: string
  public headersInit: HeadersInit
  public rejectionDelay: number
  public attemptRejectionDelay: number
  public retryPolicy: IRequestRetryPolicy
  public confirmResolve: RequestResolveConfirmationCallback

  public constructor() {
    this.baseUrl = ''
    this.headersInit = new Headers()
    this.rejectionDelay = 30000
    this.attemptRejectionDelay = 10000
    this.retryPolicy = new DefaultRequestRetryPolicy()
    this.confirmResolve = (result) =>
      result.status < HttpStatus.InternalServerError
  }
}
