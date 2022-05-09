import type {
  InquiringEventPool,
  ReplyingEventPool,
  RetryingEventPool,
} from './event'

import type { InquiryBuilder } from './inquiry'

import type { ClientPluginBuilder } from './plugin'

export interface AmforyClient {
  readonly inquiring: InquiringEventPool
  readonly replying: ReplyingEventPool
  readonly retrying: RetryingEventPool

  use(builder: ClientPluginBuilder): this

  get(path: string): InquiryBuilder
  head(path: string): InquiryBuilder
  post(path: string): InquiryBuilder
  put(path: string): InquiryBuilder
  delete(path: string): InquiryBuilder
  patch(path: string): InquiryBuilder
  inquire(method: string, path: string): InquiryBuilder
}
