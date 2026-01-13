import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { UnauthorizedError } from "../../application/errors/unauthorized-error";

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized Error',
      message: exception.message,
      path: request.url,
    });
  }
}