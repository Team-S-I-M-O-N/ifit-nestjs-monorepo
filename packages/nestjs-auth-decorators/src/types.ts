export interface AuthUserAccount {
  expirationDate: Date
  paymentType: string
  subscriptionType: string
}

export enum ACL {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  TEST = 'test'
}

export enum FLOW {
  BEARER = 'Bearer',
  BASIC = 'Basic'
}

export enum TIER {
  LVL_0,
  LVL_1,
  LVL_2,
  LVL_3
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
