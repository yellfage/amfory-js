import type { Reply } from '@yellfage/amfory'

import type { JwtPair } from './jwt-pair'

export interface JwtRefreshControl {
  confirm(reply: Reply): boolean
  refresh(refreshToken: string): Promise<JwtPair>
  fail(): void | Promise<void>
}
