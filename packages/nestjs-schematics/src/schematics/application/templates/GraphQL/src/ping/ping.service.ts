import { Injectable } from '@nestjs/common';
import { Ping } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PingService {

  constructor(private readonly prismaService: PrismaService) {}

  ping(): Promise<Ping> {
    return this.prismaService.ping.create({
      data: {
        echo: "pong"
      }
    });
  }

  pongs(): Promise<Ping[]> {
    return this.prismaService.ping.findMany();
  }
}
