import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ForbiddenExceptionError } from "../../application/errors/forbidden-error";
import { Request, Response } from "express";

@Catch(ForbiddenExceptionError)
export class ForbiddenErrorFilter implements ExceptionFilter {
  catch(exception: ForbiddenExceptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.FORBIDDEN).send({
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Forbidden Error',
      message: exception.message,
      path: request.url,
    });
  }
}