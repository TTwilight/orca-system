# 多环境配置指南

## 环境概述

本项目支持以下四种环境：

1. **开发环境 (Development)**

   - 用于本地开发和调试
   - 环境变量文件：`.env.development`
   - 构建命令：`npm run build:dev` 或 `pnpm build:dev`
   - 启动命令：`npm run start:dev` 或 `pnpm start:dev`

2. **测试环境 (QA)**

   - 用于测试团队进行功能测试
   - 环境变量文件：`.env.qa`
   - 构建命令：`npm run build:qa` 或 `pnpm build:qa`
   - 启动命令：`npm run start:qa` 或 `pnpm start:qa`

3. **预发布环境 (Stage)**

   - 用于模拟生产环境，进行最终验证
   - 环境变量文件：`.env.stage`
   - 构建命令：`npm run build:stage` 或 `pnpm build:stage`
   - 启动命令：`npm run start:stage` 或 `pnpm start:stage`

4. **生产环境 (Production)**
   - 正式环境，面向最终用户
   - 环境变量文件：`.env.production`
   - 构建命令：`npm run build:prod` 或 `pnpm build:prod`
   - 启动命令：`npm run start:prod` 或 `pnpm start:prod`

## 环境变量使用

### 在代码中使用环境变量

为了统一管理环境变量，请使用 `src/utils/env.ts` 中提供的工具函数和常量，而不是直接访问 `process.env`：

```typescript
// 导入环境变量工具类
import { API_URL, isDevelopment, FEATURE_FLAGS } from "@/utils/env";

// 使用环境变量
console.log(`当前 API 地址: ${API_URL}`);

// 根据环境执行不同逻辑
if (isDevelopment) {
  console.log("当前是开发环境");
}

// 使用功能开关
if (FEATURE_FLAGS.NEW_UI) {
  // 启用新 UI
}
```

### 添加新的环境变量

1. 在所有环境变量文件中添加新变量（`.env.development`, `.env.qa`, `.env.stage`, `.env.production`）
2. 在 `.env.example` 中添加示例和说明
3. 在 `src/utils/env.ts` 中添加对应的导出变量或函数

### 环境信息组件

在开发环境和测试环境中，页面右下角会显示当前环境信息，以便开发和测试人员快速识别当前环境。

## 注意事项

1. 所有公开的环境变量必须以 `NEXT_PUBLIC_` 开头，才能在客户端代码中访问
2. 敏感信息（如密钥、密码等）不应该存储在环境变量中，尤其是以 `NEXT_PUBLIC_` 开头的变量
3. 在提交代码时，不要提交包含敏感信息的环境变量文件
4. 在部署时，确保使用正确的环境变量文件
