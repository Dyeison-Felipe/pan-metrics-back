import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { NotFoundError } from "../../application/errors/not-found-error";

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.NOT_FOUND).send({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not-Found Error',
      message: exception.message,
      path: request.url,
    });
  }
}