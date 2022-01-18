import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { initializeSwagger } from './swagger.configuration'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await initializeSwagger(app)

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)
}

bootstrap().catch((e) => console.error(e))
