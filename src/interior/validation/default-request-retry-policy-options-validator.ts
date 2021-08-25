import { DefaultRequestRetryPolicyOptions } from '../../configuration/default-request-retry-policy-options'
import { NumberUtils } from '../number-utils'

export class DefaultRequestRetryPolicyOptionsValidator {
  public static validate(options: DefaultRequestRetryPolicyOptions): void {
    const {
      delays,
      minDelayOffset,
      maxDelayOffset,
      maxRetriesAfterDelays,
      retryableStatuses
    } = options

    if (delays !== undefined && !Array.isArray(delays)) {
      throw TypeError(
        'Invalid default request retry policy options: the "delays" field must be an array'
      )
    }

    if (
      minDelayOffset !== undefined &&
      (!NumberUtils.isNumber(minDelayOffset) || Number.isNaN(minDelayOffset))
    ) {
      throw TypeError(
        'Invalid default request retry policy options: the "minDelayOffset" field must be an number'
      )
    }

    if (
      maxDelayOffset !== undefined &&
      (!NumberUtils.isNumber(maxDelayOffset) || Number.isNaN(maxDelayOffset))
    ) {
      throw TypeError(
        'Invalid default request retry policy options: the "maxDelayOffset" field must be an number'
      )
    }

    if (
      maxRetriesAfterDelays !== undefined &&
      (!NumberUtils.isNumber(maxRetriesAfterDelays) ||
        Number.isNaN(maxRetriesAfterDelays))
    ) {
      throw TypeError(
        'Invalid default request retry policy options: the "maxRetriesAfterDelays" field must be an number'
      )
    }

    if (retryableStatuses !== undefined && !Array.isArray(retryableStatuses)) {
      throw TypeError(
        'Invalid default request retry policy options: the "retryableStatuses" field must be a function'
      )
    }
  }
}
