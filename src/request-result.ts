import type { HttpStatus } from './http-status'

export interface RequestResult<TData = unknown> {
  headers: Headers
  status: HttpStatus
  statusText: string
  data: TData
}
