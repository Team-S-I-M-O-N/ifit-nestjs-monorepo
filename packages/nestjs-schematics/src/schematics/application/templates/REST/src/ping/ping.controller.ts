import { Controller, Get } from '@nestjs/common'
import { PingService } from './ping.service'

@Controller()
export class PingController {
  constructor (private readonly pingService: PingService) {}

  @Get()
  pongs (): Array<Record<string, unknown>> {
    return this.pingService.pongs()
  }

  @Get('ping')
  ping (): Record<string, unknown> {
    return this.pingService.ping()
  }
}
