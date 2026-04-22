import { BadRequestErrorFilter } from './shared/infra/exeption-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/infra/exeption-filters/conflict-error.filter';
import { ForbiddenErrorFilter } from './shared/infra/exeption-filters/forbidden-error.filter';
import { NotFoundErrorFilter } from './shared/infra/exeption-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from './shared/infra/exeption-filters/unauthorized-error.filter';
import { EnvConfig } from './shared/application/env-config/env-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { GlobalStringLengthPipe } from '@/shared/infra/pipes/globalmax-lenght.pipe';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { EntityValidationErrorFilter } from './shared/infra/exeption-filters/validation-error.filter';

export async function globalConfig(
  app: NestFastifyApplication,
  envConfig: EnvConfig,
) {
  // PREFIX
  app.setGlobalPrefix('api');

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Pan-Metrics')
    .setDescription('Api Pan-Metrics')
    .setVersion('1.0')
    .addTag('Panificação, Padaria, Panificadora, Metricas, Pan-Metrics')
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

  // Cookies
    await app.register(fastifyCookie, {
    secret: envConfig.getCookieSecret(),
  });

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
    new GlobalStringLengthPipe()
  )

  // Global Errors
  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new ForbiddenErrorFilter(),
    new NotFoundErrorFilter(),
    new UnauthorizedErrorFilter(),
    new EntityValidationErrorFilter()
  );
}
