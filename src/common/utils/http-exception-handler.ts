import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import Request from '../interfaces/request.interface';
import { Response } from 'express';
import { APICommonResponse } from '../interfaces/api-common-response.interface';
import { LoggerService } from '../../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal Server Error';
    const correlationId = request.headers['correlation-id'];
    const productId = request.headers['product-id'];

    this.loggerService.error(
      {
        message: message,
        className: this.constructor.name,
        correlationId: correlationId,
        error: exception.name,
        payload: undefined,
        productId: productId,
      },
      exception.stack,
    );

    const responseBody: APICommonResponse<null> = {
      status: status,
      message: message,
      data: null,
      error: exception.name,
    };

    response.status(status).json(responseBody);
  }
}
