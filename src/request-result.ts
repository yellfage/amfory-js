import { HttpStatus } from './http-status'

export interface RequestResult<TData = any> {
  headers: Headers
  status: HttpStatus
  statusText: string
  data: TData
}
