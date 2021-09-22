/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { RequestSettings } from '../../configuration'

import { isFunction } from '../is-function'

import { isNumber } from '../is-number'

import { isString } from '../is-string'

export function validateRequestSettings({
  baseUrl,
  headers,
  rejectionDelay,
  attemptRejectionDelay,
  retryPolicy,
  confirmResolve
}: RequestSettings): void {
  if (!isString(baseUrl)) {
    throw new TypeError(
      'Invalid request settings: the "baseUrl" field must be a string'
    )
  }

  if (headers == null) {
    throw new TypeError(
      'Invalid request settings: the "headers" field cannot be a null or undefined'
    )
  }

  if (!isNumber(rejectionDelay) || Number.isNaN(rejectionDelay)) {
    throw new TypeError(
      'Invalid request settings: the "rejectionDelay" field must be a number'
    )
  }

  if (!isNumber(attemptRejectionDelay) || Number.isNaN(attemptRejectionDelay)) {
    throw new TypeError(
      'Invalid request settings: the "attemptRejectionDelay" field must be a number'
    )
  }

  if (retryPolicy == null) {
    throw new TypeError(
      'Invalid request settings: the "retryPolicy" field cannot be a null or undefined'
    )
  }

  if (!isFunction(confirmResolve)) {
    throw new TypeError(
      'Invalid request settings: the "confirmResolve" field must be a function'
    )
  }
}
