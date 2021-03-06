import { Injectable } from '@nestjs/common'

@Injectable()
export class PingService {
  // Replace this implementation with your favorite recipe
  // https://docs.nestjs.com/recipes/prisma

  ping (): Record<string, unknown> {
    return {
      id: 1,
      echo: 'Pong'
    }
  }

  pongs (): Array<Record<string, unknown>> {
    return [{
      id: 1,
      echo: 'Pong'
    }]
  }
}
