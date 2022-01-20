import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { LoggerService } from './service'
import { LoggerConfigOptionsAsync, LoggerOptionsFactory, LOGGER_OPTIONS } from './types'

@Global()
@Module({})
export class LoggerModule {
  public static foorRootAsync (loggerOptions: LoggerConfigOptionsAsync): DynamicModule {
    return {
      module: LoggerModule,
      imports: loggerOptions.imports ?? [],
      providers: [
        ...this.createLoggerProviders(loggerOptions),
        LoggerService
      ],
      exports: [LoggerService]
    }
  }

  private static createLoggerProviders (options: LoggerConfigOptionsAsync): Provider[] {
    if (options.useExisting !== undefined || (options.useFactory != null)) {
      return [this.createLoggerOptionsProvider(options)]
    }

    if (options.useClass === undefined) { throw new Error('At least one of the configurations must be used') }

    return [
      this.createLoggerOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ]
  }

  private static createLoggerOptionsProvider (options: LoggerConfigOptionsAsync): Provider {
    if (options.useFactory != null) {
      return {
        provide: LOGGER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject ?? []
      }
    }

    return {
      provide: LOGGER_OPTIONS,
      useFactory: async (optionsFactory: LoggerOptionsFactory) => await optionsFactory.createLoggerConfigOptions(),
      inject: (options.useExisting !== undefined) ? [options.useExisting] : options.useClass !== undefined ? [options.useClass] : []
    }
  }
}
