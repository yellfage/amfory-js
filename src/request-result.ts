import { HttpStatus } from './http-status'

export type RequestResult<TPayload = any> = {
  headers: Headers
  status: HttpStatus
  statusText: string
  payload: TPayload
}
