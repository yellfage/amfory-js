import type { Reply } from '@yellfage/amfory'

import { ReplyStatus } from '@yellfage/amfory'

import type { JwtPair, JwtRefreshControl } from '../../../src'

import type { AccessService } from './access-service'

export class BasicJwtRefreshControl implements JwtRefreshControl {
  private readonly accessService: AccessService

  public constructor(accessService: AccessService) {
    this.accessService = accessService
  }

  public confirm(reply: Reply): boolean {
    return reply.status === ReplyStatus.Unauthorized
  }

  public async refresh(refreshToken: string): Promise<JwtPair> {
    return this.accessService.refreshAccess(refreshToken)
  }

  public fail(): Promise<void> {
    // In a real app you might show a login form

    return this.accessService.issueAccess()
  }
}
