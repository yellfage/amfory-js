import { HttpStatus } from './http-status'

export type RequestRetryConfirmationCallback = (status: HttpStatus) => boolean
