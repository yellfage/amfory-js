import { HttpStatus } from '../http-status'

export const RETRYABLE_HTTP_STATUSES: HttpStatus[] = [
  HttpStatus.RequestTimeout,
  HttpStatus.InternalServerError,
  HttpStatus.ServiceUnavailable,
  HttpStatus.GatewayTimeout,
  HttpStatus.InsufficientStorage,
  HttpStatus.BandwidthLimitExceeded,
  HttpStatus.UnknownError,
  HttpStatus.WebServerIsDown,
  HttpStatus.ConnectionTimedOut,
  HttpStatus.OriginIsUnreachable,
  HttpStatus.TimeoutOccurred
]
