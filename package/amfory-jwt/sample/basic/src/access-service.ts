import type { AmforyClient } from '@yellfage/amfory'

import { ReplyStatus } from '@yellfage/amfory'

import type { Access } from './access'

import type { AccessStore } from './access-store'

import { FailedAccessRefreshError } from './failed-access-refresh-error'

export class AccessService {
  private readonly client: AmforyClient

  private readonly accessStore: AccessStore

  public constructor(client: AmforyClient, accessStore: AccessStore) {
    this.client = client
    this.accessStore = accessStore
  }

  public async issueAccess(): Promise<void> {
    const reply = await this.client.post('/access').fetchJson<Access>()

    this.accessStore.setAccess(reply.data)
  }

  /**
   * @throws {@link FailedRefreshError}
   */
  public async refreshAccess(refreshToken: string): Promise<Access> {
    const reply = await this.client
      .put('/access')
      .setJsonPayload({ refreshToken })
      .fetchJson<Access>()

    if (reply.status === ReplyStatus.BadRequest) {
      throw new FailedAccessRefreshError(reply.statusText)
    }

    this.accessStore.setAccess(reply.data)

    return reply.data
  }
}
