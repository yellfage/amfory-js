import { ReplyStatus } from '../reply'

import { BasicRetryControl } from './basic-retry-control'

import type { RetryControl } from './retry-control'

import type { RetryControlBuilder } from './retry-control-builder'

export class BasicRetryControlBuilder implements RetryControlBuilder {
  private retryableStatuses: ReplyStatus[] = [
    ReplyStatus.RequestTimeout,
    ReplyStatus.InternalServerError,
    ReplyStatus.ServiceUnavailable,
    ReplyStatus.GatewayTimeout,
    ReplyStatus.InsufficientStorage,
    ReplyStatus.BandwidthLimitExceeded,
    ReplyStatus.UnknownError,
    ReplyStatus.WebServerIsDown,
    ReplyStatus.ConnectionTimedOut,
    ReplyStatus.OriginIsUnreachable,
    ReplyStatus.TimeoutOccurred,
  ]

  public setRetryableStatuses(statuses: ReplyStatus[]): this {
    this.retryableStatuses = statuses

    return this
  }

  public build(): RetryControl {
    return new BasicRetryControl(this.retryableStatuses)
  }
}
