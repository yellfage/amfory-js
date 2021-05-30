import { RequestShape } from '../request-shape'
import { RequestContext } from './request-context'

export type RequestDescriptor = {
  readonly shape: RequestShape
  readonly context: RequestContext
}
