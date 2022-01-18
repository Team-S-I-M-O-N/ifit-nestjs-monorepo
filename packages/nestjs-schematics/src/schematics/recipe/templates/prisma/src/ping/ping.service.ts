import { Injectable } from '@nestjs/common'
import { Ping } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PingService {
  constructor (private readonly prismaService: PrismaService) {}

  async ping (): Promise<Ping> {
    return await this.prismaService.ping.create({
      data: {
        echo: 'pong'
      }
    })
  }

  async pongs (): Promise<Ping[]> {
    return await this.prismaService.ping.findMany()
  }
}
