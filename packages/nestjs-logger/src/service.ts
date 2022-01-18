import { ConsoleLogger, Inject, Injectable } from '@nestjs/common'
import { LlamaLogger, Message } from '@ifit/llama/lib/types/interfaces/llama'
import * as llama from '@ifit/llama'
import { LoggerConfigOptions, LOGGER_OPTIONS } from './types'

@Injectable()
export class LoggerService extends ConsoleLogger {
  llama: LlamaLogger

  constructor (
    @Inject(LOGGER_OPTIONS) private readonly loggerOptions: LoggerConfigOptions
  ) {
    super()
    this.llama = llama(this.loggerOptions.projectName)
  }

  setContext (context: string): void {
    this.llama = llama(context)
  }

  silly (message: Message, ...optionalParams: any[]): void {
    this.llama.silly(message, ...optionalParams)
  }

  verbose (message: Message, ...optionalParams: any[]): void {
    this.llama.verbose(message, ...optionalParams)
  }

  info (message: Message, ...optionalParams: any[]): void {
    this.llama.info(message, ...optionalParams)
  }

  debug (message: Message, ...optionalParams: any[]): void {
    this.llama.debug(message, ...optionalParams)
  }

  warn (message: Message, ...optionalParams: any[]): void {
    this.llama.warn(message, ...optionalParams)
  }

  error (message: Message, ...optionalParams: any[]): void {
    this.llama.error(message, ...optionalParams)
  }
}
