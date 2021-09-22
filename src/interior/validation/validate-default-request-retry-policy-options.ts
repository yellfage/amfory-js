import type { DefaultRequestRetryPolicyOptions } from '../../configuration'

import { isNumber } from '../is-number'

export function validateDefaultRequestRetryPolicyOptions({
  delays,
  minDelayOffset,
  maxDelayOffset,
  maxRetriesAfterDelays,
  retryableStatuses
}: DefaultRequestRetryPolicyOptions): void {
  if (delays != null && !Array.isArray(delays)) {
    throw new TypeError(
      'Invalid default request retry policy options: the "delays" field must be an array'
    )
  }

  if (
    minDelayOffset != null &&
    (!isNumber(minDelayOffset) || Number.isNaN(minDelayOffset))
  ) {
    throw new TypeError(
      'Invalid default request retry policy options: the "minDelayOffset" field must be a number'
    )
  }

  if (
    maxDelayOffset != null &&
    (!isNumber(maxDelayOffset) || Number.isNaN(maxDelayOffset))
  ) {
    throw new TypeError(
      'Invalid default request retry policy options: the "maxDelayOffset" field must be a number'
    )
  }

  if (
    maxRetriesAfterDelays != null &&
    (!isNumber(maxRetriesAfterDelays) || Number.isNaN(maxRetriesAfterDelays))
  ) {
    throw new TypeError(
      'Invalid default request retry policy options: the "maxRetriesAfterDelays" field must be a number'
    )
  }

  if (retryableStatuses != null && !Array.isArray(retryableStatuses)) {
    throw new TypeError(
      'Invalid default request retry policy options: the "retryableStatuses" field must be a function'
    )
  }
}
