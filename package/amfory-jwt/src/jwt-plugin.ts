import type {
  AmforyClient,
  ClientPlugin,
  InquiryEvent,
  ReplyingEvent,
} from '@yellfage/amfory'

import type { JwtPairStash } from './jwt-pair-stash'

import type { JwtRefreshControl } from './jwt-refresh-control'

export class JwtPlugin implements ClientPlugin {
  private readonly refreshControl: JwtRefreshControl

  private readonly pairStash: JwtPairStash

  private resendCount = 0

  public constructor(
    refreshControl: JwtRefreshControl,
    pairStash: JwtPairStash,
  ) {
    this.refreshControl = refreshControl
    this.pairStash = pairStash
  }

  public initialize(client: AmforyClient): void | Promise<void> {
    client.inquiring.add(this.handleInquiringEvent)
    client.replying.add(this.handleReplyingEvent)
  }

  private readonly handleInquiringEvent = ({ target }: InquiryEvent): void => {
    target.headers.set('authorization', `Bearer ${this.pairStash.pair.token}`)
  }

  private readonly handleReplyingEvent = async (
    event: ReplyingEvent,
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
