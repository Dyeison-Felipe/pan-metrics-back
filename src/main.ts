import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PROVIDERS } from './shared/application/constants/providers';
import globalConfig from './global-config';
import { INestApplication } from '@nestjs/common';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<INestApplication>(AppModule);

  const envConfig = app.get(PROVIDERS.ENV_CONFIG_SERVICE);

  globalConfig(app, envConfig);

  await app.listen(envConfig.getPort() ?? '0.0.0.0');
}
bootstrap();
