import { RequestSetup } from '../../request-setup'
import { StringUtils } from '../string-utils'
import { NumberUtils } from '../number-utils'
import { FunctionUtils } from '../function-utils'

export class RequestSetupValidator {
  public static validate({
    url,
    method,
    baseUrl,
    rejectionDelay,
    attemptRejectionDelay,
    confirmResolve
  }: RequestSetup): void {
    if (!StringUtils.isString(url)) {
      throw TypeError('Invalid request setup: the "url" field must be a string')
    }

    if (!StringUtils.isString(method)) {
      throw TypeError(
        'Invalid request setup: the "method" field must be a string'
      )
    }

    if (baseUrl !== undefined && !StringUtils.isString(baseUrl)) {
      throw TypeError(
        'Invalid request setup: the "baseUrl" field must be a string'
      )
    }

    if (
      rejectionDelay !== undefined &&
      (!NumberUtils.isNumber(rejectionDelay) || Number.isNaN(rejectionDelay))
    ) {
      throw TypeError(
        'Invalid request setup: the "rejectionDelay" field must be a number'
      )
    }

    if (
      attemptRejectionDelay !== undefined &&
      (!NumberUtils.isNumber(attemptRejectionDelay) ||
        Number.isNaN(attemptRejectionDelay))
    ) {
      throw TypeError(
        'Invalid request setup: the "attemptRejectionDelay" field must be a number'
      )
    }

    if (
      confirmResolve !== undefined &&
      !FunctionUtils.isFunction(confirmResolve)
    ) {
      throw TypeError(
        'Invalid request setup: the "confirmResolve" field must be a function'
      )
    }
  }
}
