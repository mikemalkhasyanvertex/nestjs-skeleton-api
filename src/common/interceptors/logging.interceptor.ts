import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import Request from '../interfaces/request.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const correlationId = request.headers['correlation-id'];
    const productId = request.headers['product-id'];

    this.loggerService.setContext(`${className}, ${handlerName}`);

    this.loggerService.log({
      message: `${request.method} ${request.originalUrl} request received`,
      className: className,
      correlationId: correlationId,
      productId: productId,
      payload: request.body,
    });

    return next
      .handle()
      .pipe(
        catchError((err) => {
          const logType = err instanceof NotFoundException ? 'warn' : 'error';
          this.loggerService[logType]({
            className: className,
            correlationId: correlationId,
            productId: productId,
            error: err,
            message: `${request.method} ${request.originalUrl} ${logType} exception`,
          });

          return throwError(() => err);
        }),
      )
      .pipe(
        tap((data) => {
          this.loggerService.log({
            message: `${request.method} ${request.originalUrl} response returned`,
            className: className,
            correlationId: correlationId,
            productId: productId,
            payload: data,
          });
        }),
      );
  }
}
