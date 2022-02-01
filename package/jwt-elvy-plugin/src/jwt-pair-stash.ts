import type { JwtPair } from './jwt-pair'

export interface JwtPairStash {
  readonly pair: JwtPair

  replacePair(pair: JwtPair): void
}
