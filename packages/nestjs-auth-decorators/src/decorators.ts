import { SetMetadata, CustomDecorator } from '@nestjs/common'
import { ACL, FLOW, SCOPE, TIER } from './types'

export const Acl = (acls: ACL[]): CustomDecorator => SetMetadata('acl', acls)
export const Flow = (flow: FLOW[]): CustomDecorator => SetMetadata('flow', flow)
export const Tier = (tier: TIER[]): CustomDecorator => SetMetadata('tier', tier)
export const Scope = (scope: SCOPE[]): CustomDecorator => SetMetadata('scope', scope)
