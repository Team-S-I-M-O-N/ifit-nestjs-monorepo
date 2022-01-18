import { Controller, Get } from '@nestjs/common'
import { Ping } from '@prisma/client'
import { PingService } from './ping.service'

@Controller()
export class PingController {
  constructor (private readonly pingService: PingService) {}

  @Get()
  async pongs (): Promise<Ping[]> {
    return await this.pingService.pongs()
  }

  @Get('ping')
  async ping (): Promise<Ping> {
    return await this.pingService.ping()
  }
}
