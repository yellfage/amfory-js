import { RequestSettings } from '../../configuration'
import { StringUtils } from '../string-utils'
import { NumberUtils } from '../number-utils'
import { FunctionUtils } from '../function-utils'

export class RequestSettingsValidator {
  public static validate(settings: RequestSettings): void {
    const {
      baseUrl,
      headers,
      rejectionDelay,
      attemptRejectionDelay,
      retryPolicy,
      confirmResolve
    } = settings

    if (!StringUtils.isString(baseUrl)) {
      throw TypeError(
        'Invalid request settings: the "baseUrl" field must be a string'
      )
    }

    if (headers == null) {
      throw TypeError(
        'Invalid request settings: the "headers" field cannot be a null or undefined'
      )
    }

    if (!NumberUtils.isNumber(rejectionDelay) || Number.isNaN(rejectionDelay)) {
      throw TypeError(
        'Invalid request settings: the "rejectionDelay" field must be a number'
      )
    }

    if (
      !NumberUtils.isNumber(attemptRejectionDelay) ||
      Number.isNaN(attemptRejectionDelay)
    ) {
      throw TypeError(
        'Invalid request settings: the "attemptRejectionDelay" field must be a number'
      )
    }

    if (retryPolicy == null) {
      throw TypeError(
        'Invalid request settings: the "retryPolicy" field cannot be a null or undefined'
      )
    }

    if (!FunctionUtils.isFunction(confirmResolve)) {
      throw TypeError(
        'Invalid request settings: the "confirmResolve" field must be a function'
      )
    }
  }
}
