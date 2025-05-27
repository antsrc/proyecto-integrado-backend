import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { errorLogger } from '../loggers/error.logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Error interno en el servidor';
    let error = 'Internal Server Error';

    let isExpected = false;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && (res as any).message) {
        message = (res as any).message;
      }

      error = HttpStatus[status] || 'Error';
      
      isExpected = status !== HttpStatus.INTERNAL_SERVER_ERROR;
    }

    else if (exception instanceof QueryFailedError) {
      const driverError = (exception as any).driverError;

      if (driverError.code === 'ER_DUP_ENTRY') {
        const match = driverError.sqlMessage?.match(/Duplicate entry '(.+)' for key/);
        const value = match?.[1];

        status = HttpStatus.BAD_REQUEST;
        message = value
          ? `El valor '${value}' ya está en uso en otro registro`
          : 'Un valor introducido ya está en uso en otro registro';
        error = 'Bad Request';
        isExpected = true;
      }

      else if (driverError.code === 'ER_NO_REFERENCED_ROW_2') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Un registro referenciado no existe';
        error = 'Bad Request';
        isExpected = true;
      }

      else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Error en la base de datos';
        error = 'Internal Server Error';
      }
    }

    if (!isExpected && status === HttpStatus.INTERNAL_SERVER_ERROR) {
      errorLogger.error({
        message: (exception as any)?.message || 'Error desconocido',
        stack: (exception as any)?.stack,
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      });
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
