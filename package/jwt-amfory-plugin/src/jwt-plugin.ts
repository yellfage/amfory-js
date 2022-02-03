import type { Inquiry, Plugin, ReplyEvent } from '@yellfage/amfory'

import type { JwtPairStash } from './jwt-pair-stash'

import type { JwtRefreshControl } from './jwt-refresh-control'

export class JwtPlugin implements Plugin {
  private readonly refreshControl: JwtRefreshControl

  private readonly pairStash: JwtPairStash

  private readonly inquiry: Inquiry

  private resendCount = 0

  public constructor(
    refreshControl: JwtRefreshControl,
    pairStash: JwtPairStash,
    inquiry: Inquiry,
  ) {
    this.refreshControl = refreshControl
    this.pairStash = pairStash
    this.inquiry = inquiry
  }

  public initialize(): void | Promise<void> {
    this.inquiry.on('inquiry', this.handleInquiryEvent)
    this.inquiry.on('reply', this.handleReplyEvent)
  }

  public terminate(): void | Promise<void> {
    //
  }

  private readonly handleInquiryEvent = (): void => {
    this.inquiry.shape.headers.set(
      'authorization',
      `Bearer ${this.pairStash.pair.token}`,
    )
  }

  private readonly handleReplyEvent = async (
    event: ReplyEvent,
  ): Promise<void> => {
    if (!this.refreshControl.confirm(event.reply)) {
      return
    }

    if (this.resendCount > 0) {
      return this.refreshControl.fail()
    }

    try {
      const pair = await this.refreshControl.refresh(
        this.pairStash.pair.refreshToken,
      )

      this.pairStash.replacePair(pair)
    } catch {
      return this.refreshControl.fail()
    }

    this.resendCount += 1

    return event.resend()
  }
}
