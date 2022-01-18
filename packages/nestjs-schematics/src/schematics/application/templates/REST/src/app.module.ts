import { Module } from '@nestjs/common'
import { EnvValidation } from './env.validation'
import { PingModule } from './ping/ping.module'

@Module({
  imports: [
    EnvValidation,
    PingModule
  ]
})
export class AppModule {}
