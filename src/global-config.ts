import { INestApplication } from '@nestjs/common';
import { BadRequestErrorFilter } from './shared/infra/exeption-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/infra/exeption-filters/conflict-error.filter';
import { ForbiddenErrorFilter } from './shared/infra/exeption-filters/forbidden-error.filter';
import { NotFoundErrorFilter } from './shared/infra/exeption-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from './shared/infra/exeption-filters/unauthorized-error.filter';
import { EnvConfig } from './shared/application/env-config/env-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function globalConfig(
  app: INestApplication,
  envConfig: EnvConfig,
) {
  // PREFIX
  app.setGlobalPrefix('api');

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Barber-Shop')
    .setDescription('Api Barber-Shop')
    .setVersion('1.0')
    .addTag('Barber')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  //  CORS

  const origins = envConfig.getAllowedOrigins();
  app.enableCors({
    origin: origins,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
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
