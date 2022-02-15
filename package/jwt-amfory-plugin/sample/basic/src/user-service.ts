import type { AmforyClient } from '@yellfage/amfory'

import type { User } from './user'

export class UserService {
  private readonly client: AmforyClient

  public constructor(client: AmforyClient) {
    this.client = client
  }

  public async getAll(): Promise<User[]> {
    const reply = await this.client.get('/user').fetchJson<User[]>()

    return reply.data
  }
}
