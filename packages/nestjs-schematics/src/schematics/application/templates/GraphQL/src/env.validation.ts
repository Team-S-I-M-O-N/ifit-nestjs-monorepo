import { ConfigModule } from '@nestjs/config'
import { plainToClass } from 'class-transformer'
import { IsDefined, IsNumber, IsString, IsUrl, validateSync } from 'class-validator'
import { IEnv } from './env.types'

export class EnvironmentVariables implements IEnv {
  /* General ENV */
  @IsNumber() PORT: number = 3000
  @IsString() @IsDefined() PROJECT_NAME: string
  /* Database ENV */
  @IsDefined()
  @IsUrl({ protocols: ['postgresql'], require_tld: false, require_port: true })
  DATABASE_URL: string

  @IsDefined() DB_AUTH: string
  @IsDefined() @IsNumber() DB_PORT: number
  /* AWS ENV */
  @IsString() AWS_REGION: string = 'us-east-1'
  /* Ifit ENV */
  @IsDefined() IFIT_API_CLIENT_ID: string
  @IsDefined() IFIT_API_CLIENT_SECRET: string
  @IsUrl() IFIT_API_ENDPOINT: string = 'https://api.ifit-test.com'
  @IsUrl() IFIT_GATEWAY_ENDPOINT: string = 'https://gateway.ifit-test.com'
  /* Llama ENV */
  @IsDefined() LLAMA_LE_TOKEN: string
  @IsString() LLAMA_LOG_LEVEL: string = 'warn'
  /* Beaker ENV */
  @IsString() BEAKER_USER_ID: string
  @IsString() BEAKER_USER_PASSWORD: string
  @IsString() FLENDERSON_URI: string
}

export function validateEnv (config: Record<string, unknown>): EnvironmentVariables {
  const validateConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true }
  )

  const errors = validateSync(
    validateConfig,
    {
      skipMissingProperties: false,
      stopAtFirstError: true,
      forbidUnknownValues: true
    }
  )

  if (errors.length > 0) {
    const parsedErrors = errors.flatMap(error => Object.values(error.constraints ?? {}))
    const beautifiedErrors = parsedErrors.toString().replace(/,/g, '\n * ')
    throw new Error(`ENV vallidation failed \n * ${beautifiedErrors} \n`)
  }

  return validateConfig
}

export const EnvValidation = ConfigModule.forRoot({
  validate: validateEnv,
  isGlobal: true,
  cache: true,
  expandVariables: true
})
