import { INestApplication } from '@nestjs/common';
import { BadRequestErrorFilter } from './shared/infra/exeption-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/infra/exeption-filters/conflict-error.filter';
import { ForbiddenErrorFilter } from './shared/infra/exeption-filters/forbidden-error.filter';
import { NotFoundErrorFilter } from './shared/infra/exeption-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from './shared/infra/exeption-filters/unauthorized-error.filter';
import { EnvConfig } from './shared/application/env-config/env-config';

export default function globalConfig(app: INestApplication, envConfig: EnvConfig) {
  // PREFIX
  app.setGlobalPrefix('api');

  //  CORS

  const origins = envConfig.getAllowedOrigins();
  app.enableCors({
    origin: origins,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // Global Errors
  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new ForbiddenErrorFilter(),
    new NotFoundErrorFilter(),
    new UnauthorizedErrorFilter(),
  );
}
