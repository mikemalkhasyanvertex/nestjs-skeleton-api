import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { ILoggerParams } from './interfaces/logger-params';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  log(message: string | ILoggerParams) {
    if (typeof message === 'string') {
      super.log(message);
    } else {
      super.log(JSON.stringify(message));
    }
  }

  error(
    message:
      | string
      | (ILoggerParams & {
          error: string;
        }),
    stack?: string,
  ) {
    if (typeof message === 'string') {
      super.error(message, stack);
    } else {
      super.error(JSON.stringify(message), stack);
    }
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: string,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    let parsedMessageJSON: { [key: string]: any } = {};

    try {
      parsedMessageJSON = JSON.parse(message);
    } catch (e) {
      parsedMessageJSON = { message };
    }

    return `${JSON.stringify({
      timestamp: this.getTimestamp(),
      logLevel,
      contextMessage,
      // Map log payload object in the first level
      ...parsedMessageJSON,
    })}\n`;
  }
}
