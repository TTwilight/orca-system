import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from '../constants/error-code.constant';

/**
 * 业务异常类
 */
export class BusinessException extends HttpException {
  /**
   * 构造函数
   * @param code 错误码
   * @param message 错误消息
   */
  constructor(code = ErrorCode.FAIL, message?: string) {
    // 如果没有提供消息，则使用错误码对应的默认消息
    if (!message) {
      message = ErrorMessage[code] || ErrorMessage[ErrorCode.FAIL];
    }

    console.log('BusinessException', code, message);

    super(
      {
        code,
        data: null,
        msg: message,
      },
      HttpStatus.OK, // 业务异常通常使用200状态码，通过code区分错误类型
    );
  }
}

/**
 * 参数异常类
 */
export class ParamException extends HttpException {
  constructor(message = ErrorMessage[ErrorCode.PARAM_ERROR]) {
    super(
      {
        code: ErrorCode.PARAM_ERROR,
        data: null,
        msg: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * 未授权异常类
 */
export class UnauthorizedException extends HttpException {
  constructor(message = ErrorMessage[ErrorCode.UNAUTHORIZED]) {
    super(
      {
        code: ErrorCode.UNAUTHORIZED,
        data: null,
        msg: message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * 禁止访问异常类
 */
export class ForbiddenException extends HttpException {
  constructor(message = ErrorMessage[ErrorCode.FORBIDDEN]) {
    super(
      {
        code: ErrorCode.FORBIDDEN,
        data: null,
        msg: message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

/**
 * 资源不存在异常类
 */
export class NotFoundException extends HttpException {
  constructor(message = ErrorMessage[ErrorCode.NOT_FOUND]) {
    super(
      {
        code: ErrorCode.NOT_FOUND,
        data: null,
        msg: message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
