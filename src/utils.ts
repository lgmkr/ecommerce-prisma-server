import * as jwt from 'jsonwebtoken'
import { Prisma } from '../prisma/generated/prisma-client'

export interface Context {
  prisma: Prisma
  request: any
}

export function getUserId(ctx: Context, jwtToken: String = null) {
  let token;

  if(jwtToken) {
    token = jwtToken
  } else {
    const Authorization = ctx.request.get('Authorization')
    token = Authorization.replace('Bearer ', '')
  }

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export const createToken = (userId: String): Object =>
  jwt.sign({ userId, expiresIn: '7d'}, process.env.APP_SECRET)

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
