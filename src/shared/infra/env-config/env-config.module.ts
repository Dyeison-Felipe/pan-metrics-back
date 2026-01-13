import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { EnvConfigService } from './env-config.service';
import { PROVIDERS } from '../../application/constants/providers';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PROVIDERS.ENV_CONFIG_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new EnvConfigService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [PROVIDERS.ENV_CONFIG_SERVICE],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    return ConfigModule.forRoot({
      isGlobal: true,
      ...options,
    });
  }
}
