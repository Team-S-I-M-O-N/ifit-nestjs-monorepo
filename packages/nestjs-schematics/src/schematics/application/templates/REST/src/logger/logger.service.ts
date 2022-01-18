import { ConsoleLogger, Injectable, Scope } from '@nestjs/common'
import { LlamaLogger, Message } from '@ifit/llama/lib/types/interfaces/llama'
import * as llama from '@ifit/llama'
import { ConfigService } from '@nestjs/config'
import { IEnv } from 'src/env.types'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  llama: LlamaLogger

  constructor (
    private readonly configService: ConfigService<IEnv>
  ) {
    super()
    this.llama = llama(this.configService.get('PROJECT_NAME', ''))
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
