import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ConflictError } from "../../application/errors/conflict-error";

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.CONFLICT).send({
      statusCode: HttpStatus.CONFLICT,
      error: 'Conflict Error',
      message: exception.message,
      path: request.url,
    });
  }
}