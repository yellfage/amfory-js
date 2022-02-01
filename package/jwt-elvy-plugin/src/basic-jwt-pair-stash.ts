import type { JwtPair } from './jwt-pair'

import type { JwtPairStash } from './jwt-pair-stash'

export class BasicJwtPairStash implements JwtPairStash {
  public pair: JwtPair

  public constructor(pair: JwtPair) {
    this.pair = pair
  }

  public replacePair(pair: JwtPair): void {
    this.pair = pair
  }
}
