import { ReplyStatus } from '../../../reply'

import type { RetryControl } from '../retry-control'

import type { RetryControlBuilder } from '../retry-control-builder'

import { BasicRetryControl } from './basic-retry-control'

export class BasicRetryControlBuilder implements RetryControlBuilder {
  private statuses: ReplyStatus[]

  public constructor(
    statuses: ReplyStatus[] = [
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
    ],
  ) {
    this.statuses = statuses
  }

  public setStatuses(statuses: ReplyStatus[]): this {
    this.statuses = statuses

    return this
  }

  public addStatuses(statuses: ReplyStatus[]): this {
    this.statuses.push(...statuses)

    return this
  }

  public build(): RetryControl {
    return new BasicRetryControl(this.statuses)
  }
}
