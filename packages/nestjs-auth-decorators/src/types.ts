export interface AuthUserAccount {
  expirationDate: Date
  paymentType: string
  subscriptionType: string
}

export enum ACL {
  ADMIN = 'admin',
  DEVELOPER = 'developer'
}

export enum FLOW {
  BEARER = 'Bearer',
  BASIC = 'Basic'
}

export enum TIER {
  LEVEL_0,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3
}

export enum SCOPE {
  READ = 'read',
  WRITE = 'write'
}

export interface DecoratorsMetadata {
  tier: TIER
  scope: SCOPE
  acl: ACL
  flow: FLOW
}

export interface AuthUser {
  id: string
  account?: AuthUserAccount
  email?: string
  username?: string
  shopifyId?: number
  login?: {
    ifit: {
      email: string
      username: string
    }
    planetFitness?: {
      membershipId: string
      membershipPlan: string
      userId: string
    }
  }
  personal?: {
    firstname: string
    lastname: string
    tz: string
    birthday: string
  }
  acl?: string[]
  isPlanetFitnessUser?: boolean
  premium?: boolean
  isPaused?: boolean
}

export interface IAuthorizer {
  user: AuthUser
  client_id: string
  tier: string
  scope: string[]
  token: string
}
