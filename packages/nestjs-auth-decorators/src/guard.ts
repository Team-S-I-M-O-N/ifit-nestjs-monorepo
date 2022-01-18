import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { ValidateService } from './service'
import { Reflector } from '@nestjs/core'
import { ACL, FLOW, TIER, SCOPE } from './types'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    private readonly validateService: ValidateService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest()
      const acl = this.reflector.get<ACL>('acl', context.getHandler())
      const flow = this.reflector.get<FLOW>('flow', context.getHandler())
      const tier = this.reflector.get<TIER>('tier', context.getHandler())
      const scope = this.reflector.get<SCOPE>('scope', context.getHandler())

      return await this.validateService.verifyToken(request, { tier, scope, flow, acl })
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
