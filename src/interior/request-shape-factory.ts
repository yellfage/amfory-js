import type {
  RequestRetryPolicy,
  RequestResolveConfirmationCallback
} from '../configuration'

import type { RequestSetup } from '../request-setup'

import type { RequestShape } from '../request-shape'

export class RequestShapeFactory {
  private readonly defaultBaseUrl: string

  private readonly defaultRejectionDelay: number

  private readonly defaultAttemptRejectionDelay: number

  private readonly defaultRetryPolicy: RequestRetryPolicy

  private readonly defaultHeadersInit: HeadersInit

  private readonly defaultConfirmResolve: RequestResolveConfirmationCallback

  public constructor(
    defaultBaseUrl: string,
    defaultRejectionDelay: number,
    defaultAttemptRejectionDelay: number,
    defaultRetryPolicy: RequestRetryPolicy,
    defaultHeadersInit: HeadersInit,
    defaultConfirmResolve: RequestResolveConfirmationCallback
  ) {
    this.defaultBaseUrl = defaultBaseUrl
    this.defaultRejectionDelay = defaultRejectionDelay
    this.defaultAttemptRejectionDelay = defaultAttemptRejectionDelay
    this.defaultRetryPolicy = defaultRetryPolicy
    this.defaultHeadersInit = defaultHeadersInit
    this.defaultConfirmResolve = defaultConfirmResolve
  }

  public create({
    url,
    method,
    payload,
    baseUrl = this.defaultBaseUrl,
    params,
    headers,
    rejectionDelay = this.defaultRejectionDelay,
    attemptRejectionDelay = this.defaultAttemptRejectionDelay,
    retryPolicy = this.defaultRetryPolicy,
    abortController = new AbortController(),
    confirmResolve = this.defaultConfirmResolve
  }: RequestSetup): RequestShape {
    // eslint-disable-next-line no-undefined
    const funalUrl = new URL(url, baseUrl || undefined)

    const finalHeaders = new Headers(this.defaultHeadersInit)

    this.mergeHeaders(finalHeaders, new Headers(headers))

    this.mergeUrlSearchParams(
      funalUrl.searchParams,
      new URLSearchParams(params)
    )

    return {
      url: funalUrl,
      method,
      headers: finalHeaders,
      payload,
      rejectionDelay,
      attemptRejectionDelay,
      retryPolicy,
      abortController,
      confirmResolve
    }
  }

  private mergeHeaders(target: Headers, headers: Headers): void {
    headers.forEach((value, name) => target.set(name, value))
  }

  private mergeUrlSearchParams(
    target: URLSearchParams,
    params: URLSearchParams
  ): void {
    params.forEach((value, name) => target.set(name, value))
  }
}
