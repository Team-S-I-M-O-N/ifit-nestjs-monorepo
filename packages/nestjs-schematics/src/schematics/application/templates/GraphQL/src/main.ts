import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { initializeSwagger } from './swagger.configuration'
import { parse } from 'graphql'
import { request } from 'graphql-request'
import { normalizeTypeDefs } from '@apollo/federation'
import { printWithComments } from '@graphql-tools/utils'
import { promises as fs } from 'fs'

async function bootstrap(): Promise<void> {
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
  await generatedFederatedSchema(port)
}

const sdlQuery = `
  query {
    _service {
      sdl
    }
  }
`

export async function generatedFederatedSchema(port: number): Promise<void> {
  const sdlResult = await request(`http://localhost:${port}/graphql`, sdlQuery)

  const typeDefs = parse(sdlResult._service.sdl)
  const schema = printWithComments(normalizeTypeDefs(typeDefs))

  const federatedSchema = `# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

${schema}`

  await fs.writeFile('src/federated-schema.gql', federatedSchema, {
    encoding: 'utf8'
  })
}

bootstrap().catch((e) => console.error(e))
