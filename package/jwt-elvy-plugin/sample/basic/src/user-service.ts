import type { ElvyClient } from '@yellfage/elvy'

import type { User } from './user'

export class UserService {
  private readonly client: ElvyClient

  public constructor(client: ElvyClient) {
    this.client = client
  }

  public async getAll(): Promise<User[]> {
    const reply = await this.client
      .inquire('GET')
      .setPath('/user')
      .fetchJson<User[]>()

    return reply.data
  }
}
