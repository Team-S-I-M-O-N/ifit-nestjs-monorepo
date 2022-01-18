import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Ping } from 'src/@generated/prisma-nestjs-graphql/models/ping/ping'
import { PingService } from './ping.service'

@Resolver(() => Ping)
export class PingResolver {
  constructor (private readonly pingService: PingService) {}

  @Query(() => Ping)
  async ping (): Promise<Ping | null> {
    return await this.pingService.ping()
  }
}
