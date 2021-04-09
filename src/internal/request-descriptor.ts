import { RequestSetup } from '../request-setup'
import { RequestContext } from './request-context'

export type RequestDescriptor = {
  readonly setup: RequestSetup
  readonly context: RequestContext
}
