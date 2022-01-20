import { ModuleMetadata, Type } from '@nestjs/common'

export interface LoggerConfigOptions {
  projectName: string
  token?: string
  level?: string
}

export interface LoggerOptionsFactory {
  createLoggerConfigOptions: () => Promise<LoggerConfigOptions> | LoggerConfigOptions
}

export interface LoggerConfigOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useExisting?: Type<LoggerOptionsFactory>
  useClass?: Type<LoggerOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<LoggerConfigOptions> | LoggerConfigOptions
}

export const LOGGER_OPTIONS = 'LOGGER_OPTIONS'
