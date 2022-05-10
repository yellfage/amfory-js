import type {
  AmforyClient,
  ClientPlugin,
  InquiryEvent,
  ReplyingEvent,
} from '@yellfage/amfory'

import type { JwtPairStash } from './jwt-pair-stash'

import type { JwtRefreshControl } from './jwt-refresh-control'

const RESEND_COUNT_KEY = 'jwt-resend-count'

export class JwtPlugin implements ClientPlugin {
  private readonly refreshControl: JwtRefreshControl

  private readonly pairStash: JwtPairStash

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

  private readonly handleInquiringEvent = (event: InquiryEvent): void => {
    event.target.headers.set(
      'authorization',
      `Bearer ${this.pairStash.pair.token}`,
    )

    event.target.items.set<number>(RESEND_COUNT_KEY, 0)
  }

  private readonly handleReplyingEvent = async (
    event: ReplyingEvent,
  ): Promise<void> => {
    if (!this.refreshControl.confirm(event.reply)) {
      return
    }

    const resendCount = event.target.items.get<number>(RESEND_COUNT_KEY)

    if (resendCount > 0) {
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

    event.target.items.set(RESEND_COUNT_KEY, resendCount + 1)

    return event.resend()
  }
}
