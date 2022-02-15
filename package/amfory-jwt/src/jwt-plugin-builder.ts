import type { Inquiry, Plugin, PluginBuilder } from '@yellfage/amfory'

import type { JwtPairStash } from './jwt-pair-stash'

import { JwtPlugin } from './jwt-plugin'

import type { JwtRefreshControl } from './jwt-refresh-control'

export class JwtPluginBuilder implements PluginBuilder {
  private readonly refreshControl: JwtRefreshControl

  private readonly pairStash: JwtPairStash

  public constructor(
    refreshControl: JwtRefreshControl,
    pairStash: JwtPairStash,
  ) {
    this.refreshControl = refreshControl
    this.pairStash = pairStash
  }

  public build(inquiry: Inquiry): Plugin {
    return new JwtPlugin(this.refreshControl, this.pairStash, inquiry)
  }
}
