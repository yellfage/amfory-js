/* eslint-disable no-console */
import { AmforyClientBuilder } from '@yellfage/amfory'

import type { JwtPairStash, JwtRefreshControl } from '../../../src'

import { BasicJwtPairStash, JwtPluginBuilder } from '../../../src'

import { AccessService } from './access-service'

import { AccessStore } from './access-store'

import { BasicJwtRefreshControl } from './basic-jwt-refresh-control'

import { JWT_EXPIRATION_TIME } from './shared'

import { UserService } from './user-service'

const client = new AmforyClientBuilder('http://localhost:3000').build()

const accessStore = new AccessStore()

const accessService = new AccessService(client, accessStore)
const userService = new UserService(client)

const jwtRefreshControl: JwtRefreshControl = new BasicJwtRefreshControl(
  accessService,
)
const jwtPairStash: JwtPairStash = new BasicJwtPairStash(
  accessStore.getAccessOrDefault(),
)
const jwtPlugin = new JwtPluginBuilder(jwtRefreshControl, jwtPairStash)

client.use(jwtPlugin)

accessStore.onchange = (access) => {
  jwtPairStash.replacePair(access)
}

// First of all, in a real application, you need to check if the current user is authenticated.
// If it is not, you might show a login form or do something like this.
// In the current case, we just issue a new access if refreshing fails

setInterval(async () => {
  const users = await userService.getAll()

  console.log('Users:', users)
}, JWT_EXPIRATION_TIME + 1000)
