# AuthGuard 使用指南

## 概述

`AuthGuard` 是一个用于保护 API 接口的认证守卫，它会从请求头中获取 JWT token 并验证其有效性。如果 token 无效或不存在，将抛出未授权异常，阻止未登录用户访问受保护的资源。

## 功能特点

- 自动从请求头中提取 Bearer token
- 验证 token 的有效性和过期状态
- 解析 token 并将用户信息附加到请求对象上
- 区分处理 token 过期和无效的情况
- 与自定义异常处理系统集成，返回统一的错误格式

## 安装与配置

### 1. 导入 AuthModule

在 `app.module.ts` 中导入 `AuthModule`：

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 其他模块...
    AuthModule,
  ],
})
export class AppModule {}
```

### 2. 配置环境变量

在 `.env` 文件中添加以下配置：

```
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

## 使用方法

### 1. 全局使用

如果希望对所有接口都进行认证保护，可以在 `main.ts` 中注册为全局守卫：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
bootstrap();
```

### 2. 控制器级别使用

如果希望对特定控制器的所有方法进行保护，可以在控制器上使用 `@UseGuards` 装饰器：

```typescript
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  // 所有方法都需要认证
}
```

### 3. 方法级别使用

如果只希望对特定方法进行保护，可以在方法上使用 `@UseGuards` 装饰器：

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

  @Get('public')
  getPublicInfo() {
    // 无需认证即可访问
  }
}
```

### 4. 标记公开接口

如果在全局或控制器级别应用了 `AuthGuard`，但希望某些特定方法不需要认证，可以使用 `@SkipAuth()` 装饰器：

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common';
import { SkipAuth } from '../../common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard) // 控制器级别应用 AuthGuard
export class UserController {
  @Get('profile')
  getProfile() {
    // 需要认证才能访问
  }

  @SkipAuth() // 标记为公开接口，跳过认证
  @Get('public')
  getPublicInfo() {
    // 无需认证即可访问
  }
}
```

## 获取当前用户信息

### 1. 使用 @CurrentUser 装饰器（推荐）

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() user: any) {
    // user 包含当前登录用户的信息
    return { user };
  }
}
```

### 2. 从请求对象中获取

```typescript
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request: Request) {
    // 从请求对象中获取用户信息
    const user = request['user'];
    return { user };
  }
}
```

## 前端发送认证请求

前端在发送请求时，需要在请求头中添加 `Authorization` 字段，格式为 `Bearer {token}`：

```javascript
// 示例：使用 fetch API
const token = localStorage.getItem('token');

fetch('http://localhost:3000/user/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## 错误处理

当认证失败时，`AuthGuard` 会抛出以下异常：

1. **未提供 token**：抛出 `UnauthorizedException`，错误消息为 "未提供认证令牌"
2. **token 过期**：抛出 `UnauthorizedException`，错误码为 `ErrorCode.TOKEN_EXPIRED`
3. **token 无效**：抛出 `UnauthorizedException`，错误码为 `ErrorCode.TOKEN_INVALID`

这些异常会被全局异常过滤器捕获，并转换为统一的响应格式：

```json
{
  "code": "401",
  "data": null,
  "msg": "未授权"
}
```

## 注意事项

1. **JWT Secret**：确保在生产环境中使用强密钥，并通过环境变量注入，而不是硬编码
2. **Token 格式**：token 必须以 `Bearer ` 开头（注意空格）
3. **Token 过期时间**：根据安全需求设置合适的过期时间，过长会增加安全风险，过短会影响用户体验
4. **刷新 Token**：考虑实现 token 刷新机制，以提高用户体验
5. **用户信息**：token 中只存储必要的用户信息，避免存储敏感数据
6. **公开接口**：使用 `@SkipAuth()` 装饰器标记不需要认证的公开接口
7. **获取用户信息**：优先使用 `@CurrentUser()` 装饰器获取用户信息，而不是从请求对象中获取

## 示例代码

完整的示例代码可以参考：

- `src/common/guards/auth.guard.ts`：AuthGuard 实现
- `src/common/decorators/current-user.decorator.ts`：CurrentUser 装饰器
- `src/modules/auth/auth.module.ts`：AuthModule 配置
- `src/modules/user/user.controller.example.ts`：使用示例
