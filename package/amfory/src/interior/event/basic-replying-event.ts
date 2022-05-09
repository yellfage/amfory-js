import type { ReplyingEvent } from '../../event'

import type { Inquiry } from '../../inquiry'

import type { Reply } from '../../reply'

import { BasicInquiryEvent } from './basic-inquiry-event'

export class BasicReplyingEvent<TResult>
  extends BasicInquiryEvent<TResult>
  implements ReplyingEvent<TResult>
{
  public reply: Reply<TResult>

  public constructor(target: Inquiry<TResult>, reply: Reply<TResult>) {
    super(target)

    this.reply = reply
  }

  public async resend(): Promise<void> {
    this.reply = await this.target.send()
  }
}
