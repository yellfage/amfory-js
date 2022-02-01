import type { Reply } from '@yellfage/elvy'

import type { JwtPair } from './jwt-pair'

export interface JwtRefreshControl {
  confirm(reply: Reply): boolean
  refresh(refreshToken: string): Promise<JwtPair>
  fail(): void | Promise<void>
}
