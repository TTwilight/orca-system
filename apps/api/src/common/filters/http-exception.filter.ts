import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-code.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = '请求失败';
    let code = '-1';

    if (exception instanceof UnauthorizedException) {
      // 处理自定义的 UnauthorizedException
      const exceptionResponse = exception.getResponse() as any;
      code = exceptionResponse.code || ErrorCode.TOKEN_INVALID;
      message = exceptionResponse.msg || '认证已过期';
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;
    } else if (
      typeof exceptionResponse === 'object' &&
      'msg' in exceptionResponse
    ) {
      message = (exceptionResponse.msg as string) || message;
      if ('code' in exceptionResponse) {
        code = (exceptionResponse.code as string) || code;
      }
    }

    response.status(status).json({
      code,
      data: null,
      msg: message,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = '服务器内部错误';
    let code = '-1';

    if (exception instanceof UnauthorizedException) {
      // 处理自定义的 UnauthorizedException
      const exceptionResponse = exception.getResponse() as any;
      code = exceptionResponse.code || '401';
      message = exceptionResponse.msg || '未授权';
    } else if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        message = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message[0]
          : exceptionResponse.message;
      } else if (
        typeof exceptionResponse === 'object' &&
        'msg' in exceptionResponse
      ) {
        message = (exceptionResponse.msg as string) || message;
        if ('code' in exceptionResponse) {
          code = (exceptionResponse.code as string) || code;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      code,
      data: null,
      msg: message,
      timestamp: new Date().toISOString(),
    });
  }
}
