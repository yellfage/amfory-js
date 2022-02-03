import type { ReplyEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

export class BasicReplyEvent<TReplyData> implements ReplyEvent<TReplyData> {
  public readonly inquiry: Inquiry<TReplyData>

  public reply: Reply<TReplyData>

  public constructor(inquiry: Inquiry<TReplyData>, reply: Reply<TReplyData>) {
    this.inquiry = inquiry
    this.reply = reply
  }

  public async resend(): Promise<void> {
    this.reply = await this.inquiry.send()
  }
}
