# Services 目录

## 简介

本目录用于存放所有与后端 API 交互的服务代码，遵循阿里 API 命名规范，采用统一的错误处理和响应格式。

## 目录结构

```
services/
├── index.ts          # 统一导出所有服务
├── auth.ts           # 认证相关服务（登录、注册、忘记密码等）
├── user.ts           # 用户相关服务（获取用户信息、更新用户信息等）
├── common.ts         # 通用服务（文件上传、系统配置等）
└── README.md         # 本文档
```

## 使用方法

### 导入服务

```typescript
// 方式一：从统一入口导入
import { loginByEmail, getCurrentUser } from "@/services";

// 方式二：从具体服务文件导入
import { loginByEmail } from "@/services/auth";
import { getCurrentUser } from "@/services/user";
```

### 调用服务

```typescript
// 登录示例
const handleLogin = async () => {
  try {
    const result = await loginByEmail({
      email: "user@example.com",
      password: "password123",
    });
    console.log("登录成功", result);
  } catch (error) {
    console.error("登录失败", error);
  }
};

// 获取用户信息示例
const fetchUserInfo = async () => {
  try {
    const result = await getCurrentUser();
    console.log("用户信息", result);
  } catch (error) {
    console.error("获取用户信息失败", error);
  }
};
```

## 命名规范

遵循阿里 API 命名规范：

1. **接口命名**：使用语义化的动词+名词组合

   - `get`: 获取资源
   - `list`: 获取资源列表
   - `create`: 创建资源
   - `update`: 更新资源
   - `delete`: 删除资源
   - `batch`: 批量操作前缀

2. **函数命名**：使用驼峰命名法，动词开头

   - `getXxx`: 获取某资源
   - `listXxx`: 获取某资源列表
   - `createXxx`: 创建某资源
   - `updateXxx`: 更新某资源
   - `deleteXxx`: 删除某资源
   - `batchDeleteXxx`: 批量删除某资源

3. **参数命名**：使用驼峰命名法，名词开头
   - 查询参数：`xxxQuery`
   - 创建参数：`xxxParams`
   - 更新参数：`xxxParams`

## 错误处理

所有服务统一使用 `request` 工具进行请求，错误处理已在 `request` 中统一处理。如需自定义错误处理，可在调用服务时使用 try/catch 捕获异常。
