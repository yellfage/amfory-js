import { RequestSetup } from './request-setup'

export type RequestEvent<TPayload = any> = {
  readonly setup: RequestSetup<TPayload>
}
