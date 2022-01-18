import { DecoratorsMetadata } from './types'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const authToken = require('@ifit/janus').authToken

@Injectable()
export class ValidateService {
  async verifyToken (request: Request, { tier, scope, flow, acl }: DecoratorsMetadata): Promise<boolean> {
    const token: string = request.headers.authorization ?? ''
    const auth = await authToken.getAuthFromToken(token)
    const access = await authToken.authMatchesRequirements(auth, { tier, scope, flow, acl })
    return access
  }
}
