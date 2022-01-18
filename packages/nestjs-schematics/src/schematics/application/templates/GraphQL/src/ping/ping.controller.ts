import { Controller, Get } from '@nestjs/common'
import { PingService } from './ping.service'
import { Ping } from '@prisma/client'

@Controller()
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  async pongs(): Promise<Ping[]> {
    return await this.pingService.pongs()
  }

  @Get("ping")
  async ping(): Promise<Ping> {
    return await this.pingService.ping()
  }
}
