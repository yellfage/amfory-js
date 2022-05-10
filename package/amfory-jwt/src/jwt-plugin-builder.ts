import type { ClientPluginBuilder } from '@yellfage/amfory'

import type { JwtPairStash } from './jwt-pair-stash'

import { JwtPlugin } from './jwt-plugin'

import type { JwtRefreshControl } from './jwt-refresh-control'

export class JwtPluginBuilder implements ClientPluginBuilder {
  private readonly refreshControl: JwtRefreshControl

  private readonly pairStash: JwtPairStash

  public constructor(
    refreshControl: JwtRefreshControl,
    pairStash: JwtPairStash,
  ) {
    this.refreshControl = refreshControl
    this.pairStash = pairStash
  }

  public build(): JwtPlugin {
    return new JwtPlugin(this.refreshControl, this.pairStash)
  }
}
