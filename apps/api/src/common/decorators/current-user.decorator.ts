import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '../exceptions/business.exception';

/**
 * 获取当前用户的装饰器
 * 用于从请求对象中提取当前登录用户信息
 * 使用示例：@CurrentUser() user: any
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('未找到用户信息，请确保使用了 AuthGuard');
    }

    return user;
  },
);
