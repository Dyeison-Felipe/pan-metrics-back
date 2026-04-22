import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import type { FastifyRequest, FastifyReply } from 'fastify';
import { EntityValidationError } from '@/shared/application/errors/validation-error';

@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    response.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'EntityValidation Error',
      message: exception.message,
      path: request.url,
    });
  }
}
