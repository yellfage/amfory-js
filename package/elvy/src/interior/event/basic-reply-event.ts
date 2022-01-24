import type { ReplyEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

export class BasicReplyEvent<TReplyData> implements ReplyEvent<TReplyData> {
  public readonly inquiry: Inquiry

  public reply: Reply<TReplyData>

  public constructor(inquiry: Inquiry, reply: Reply<TReplyData>) {
    this.inquiry = inquiry
    this.reply = reply
  }

  public replaceReply(reply: Reply<TReplyData>): void {
    this.reply = reply
  }
}
