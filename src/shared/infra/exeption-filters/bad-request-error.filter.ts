import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { BadRequestError } from "../../application/errors/bad-request-error";

@Catch(BadRequestError)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad request Error',
      message: exception.message,
      path: request.url,
    });
  }
}