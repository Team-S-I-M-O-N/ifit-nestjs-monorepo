import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { LoggerService } from './service'
import { LoggerConfigOptionsAsync, LoggerOptionsFactory, LOGGER_OPTIONS } from './types';

@Global()
@Module({})
export class LoggerModule {
  public static foorRootAsync(loggerOptions: LoggerConfigOptionsAsync): DynamicModule {
    return {
      module: LoggerModule,
      imports: loggerOptions.imports || [],
      providers: [
        ...this.createLoggerProviders(loggerOptions),
        LoggerService
      ],
      exports: [LoggerService]
    };
  }

  private static createLoggerProviders(options: LoggerConfigOptionsAsync): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createLoggerOptionsProvider(options)];
    }

    return [
      this.createLoggerOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ];
  }

  private static createLoggerOptionsProvider(options: LoggerConfigOptionsAsync): Provider {
    if (options.useFactory) {
      return {
        provide: LOGGER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: LOGGER_OPTIONS,
      useFactory: async (optionsFactory: LoggerOptionsFactory) => await optionsFactory.createLoggerConfigOptions(),
      inject: [options.useExisting || options.useClass!],
    };
  }
}
