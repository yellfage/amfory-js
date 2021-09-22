import type { RequestSetup } from '../../request-setup'

import { isFunction } from '../is-function'

import { isNumber } from '../is-number'

import { isString } from '../is-string'

export function validateRequestSetup({
  url,
  method,
  baseUrl,
  rejectionDelay,
  attemptRejectionDelay,
  confirmResolve
}: RequestSetup): void {
  if (!isString(url)) {
    throw new TypeError(
      'Invalid request setup: the "url" field must be a string'
    )
  }

  if (!isString(method)) {
    throw new TypeError(
      'Invalid request setup: the "method" field must be a string'
    )
  }

  if (baseUrl != null && !isString(baseUrl)) {
    throw new TypeError(
      'Invalid request setup: the "baseUrl" field must be a string'
    )
  }

  if (
    rejectionDelay != null &&
    (!isNumber(rejectionDelay) || Number.isNaN(rejectionDelay))
  ) {
    throw new TypeError(
      'Invalid request setup: the "rejectionDelay" field must be a number'
    )
  }

  if (
    attemptRejectionDelay != null &&
    (!isNumber(attemptRejectionDelay) || Number.isNaN(attemptRejectionDelay))
  ) {
    throw new TypeError(
      'Invalid request setup: the "attemptRejectionDelay" field must be a number'
    )
  }

  if (confirmResolve != null && !isFunction(confirmResolve)) {
    throw new TypeError(
      'Invalid request setup: the "confirmResolve" field must be a function'
    )
  }
}
