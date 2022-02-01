import crypto from 'crypto'

import bodyParser from 'body-parser'

import cors from 'cors'

import type { NextFunction, Request, Response } from 'express'

import express from 'express'

import jwt from 'jsonwebtoken'

import { JWT_EXPIRATION_TIME } from './shared'

import type { User } from './user'

// Do not store your secret keys in source files
const secretKey = '6766bc8a6ded0c496909f6bf423245e7'

const refreshTokens = new Set()

const users: User[] = [
  { id: '1', name: 'John' },
  { id: '2', name: 'Tom' },
  { id: '3', name: 'Henry' },
]

const issueAccess = (): { token: string; refreshToken: string } => {
  const token = jwt.sign({}, secretKey, {
    expiresIn: `${JWT_EXPIRATION_TIME}ms`,
  })

  const refreshToken = crypto.randomBytes(16).toString('hex')

  refreshTokens.add(refreshToken)

  return { token, refreshToken }
}

const hasAccess = (refreshToken: string): boolean => {
  return refreshTokens.has(refreshToken)
}

const removeAccess = (refreshToken: string): void => {
  refreshTokens.delete(refreshToken)
}

const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.headers.authorization ?? ''

  const [, token] = auth.split(' ')

  jwt.verify(token, secretKey, (err) => {
    if (err) {
      res.statusMessage = 'Failed to verify JWT'

      return res.status(401).json({})
    }

    next()
  })
}

const app = express()

app.use(cors())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.post('/access', (req, res) => {
  return res.json(issueAccess())
})

app.put('/access', bodyParser.json(), (req, res) => {
  const { refreshToken } = req.body as { refreshToken?: string }

  if (typeof refreshToken !== 'string') {
    res.statusMessage = 'Invalid refresh token'

    return res.status(400).json({})
  }

  if (!hasAccess(refreshToken)) {
    res.statusMessage = 'Refresh token not found'

    return res.status(400).json({})
  }

  removeAccess(refreshToken)

  return res.json(issueAccess())
})

app.get(
  '/user',
  verifyJwt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (req, res) => {
    return res.json(users)
  },
)

app.listen(3000)
