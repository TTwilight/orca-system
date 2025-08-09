# AuthGuard 使用说明

## 简介

`AuthGuard` 是一个用于拦截未登录请求的守卫，它会从请求头中获取 JWT token 并验证其有效性。如果 token 无效或不存在，将抛出未授权异常。

## 功能

- 从请求头中提取 Bearer token
- 验证 token 的有效性
- 解析 token 并将用户信息附加到请求对象上
- 支持通过 `@SkipAuth()` 装饰器标记公开接口
- 处理 token 过期和无效的情况

## 使用方法

### 全局使用

在 `main.ts` 中注册为全局守卫：

```typescript
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 获取 JwtService 实例
  const jwtService = app.get(JwtService);

  // 注册全局守卫
  app.useGlobalGuards(new AuthGuard(jwtService));

  await app.listen(3000);
}
```

### 控制器级别使用

在控制器上使用 `@UseGuards` 装饰器：

```typescript
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  // 所有方法都需要认证
}
```

### 方法级别使用

在特定方法上使用 `@UseGuards` 装饰器：

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile() {
    // 需要认证才能访问
  }

  @Get('SkipAuth')
  getSkipAuthInfo() {
    // 无需认证即可访问
  }
}
```

### 标记公开接口

使用 `@SkipAuth()` 装饰器标记不需要认证的接口：

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, SkipAuth } from '../../common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard) // 控制器级别应用 AuthGuard
export class UserController {
  @Get('profile')
  getProfile() {
    // 需要认证才能访问
  }

  @SkipAuth() // 标记为公开接口
  @Get('SkipAuth')
  getSkipAuthInfo() {
    // 无需认证即可访问
  }
}
```

### 获取当前用户信息

#### 使用 @CurrentUser 装饰器（推荐）

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  @Get('profile')
  getProfile(@CurrentUser() user) {
    // user 包含当前登录用户的信息
    return user;
  }
}
```

#### 从请求对象中获取

```typescript
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request: Request) {
    // 获取当前用户信息
    const user = request['user'];
    return { user };
  }
}
```

## 注意事项

1. 使用 AuthGuard 前，确保已在 AppModule 中导入并配置了 JwtModule
2. token 格式必须为 `Bearer {token}`
3. token 过期或无效时会抛出相应的异常
4. 使用 `@SkipAuth()` 装饰器可以标记不需要认证的接口
5. 使用 `@CurrentUser()` 装饰器可以方便地获取当前登录用户信息

## 更多信息

详细的使用指南请参考 `AUTH_GUARD_USAGE.md` 文件。
