import type { InquiryEvent, RetryEvent, ReplyEvent } from './event'

export type EventHandlerMap = {
  inquiry: (event: InquiryEvent) => unknown
  reply: (event: ReplyEvent) => unknown
  retry: (event: RetryEvent) => unknown
}
