import { Module } from '@nestjs/common';
import { EnvValidation } from './env.validation'
import { PingModule } from './ping/ping.module'
import { GraphQLSubGraphConfig } from './graphql.config'

@Module({
  imports: [
    EnvValidation,
    PingModule,
    GraphQLSubGraphConfig
  ]
})
export class AppModule {}
