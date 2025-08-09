import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-code.constant';
import { Reflector } from '@nestjs/core';

// 用于标记不需要认证的路由
export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查是否标记为公开路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公开路由，则跳过认证
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        ErrorCode.TOKEN_INVALID,
        '未提供认证令牌',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // 将用户信息附加到请求对象上，以便在控制器中使用
      request['user'] = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(ErrorCode.TOKEN_EXPIRED, '认证已过期');
      }
      throw new UnauthorizedException(ErrorCode.TOKEN_INVALID, '认证令牌无效');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
