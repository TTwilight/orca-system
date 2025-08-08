# Orca System

该项目使用turboRepo框架构建的monorepo模板，apps目录下面的应用可以直接使用pnpm install一键安装所有依赖

## 针对apps目录下的应用

```
pnpm install
```

# 项目启动指南

本项目主要分为两个部分：Web应用（apps/web）和静态资源服务器（apps/static-server）。以下是启动方式

## pm2整体启动

1. 安装pm2：

   ```
   npm install pm2 -g
   ```

2. pm2启动
   ```
   dev：       pm2 start config/ecosystem.dev.config.js
   qa：        pm2 start config/ecosystem.qa.config.js
   stage：     pm2 start config/ecosystem.stage.config.js
   product：   pm2 start config/ecosystem.product.config.js
   ```

## 分开启动 (主要用于开发)

### 前端启动 （Web应用）

1. 进入到前端项目文件夹：

   ```
   cd ./apps/web/
   ```

2. 安装依赖

   ```
   pnpm install
   ```

3. 启动项目

- 对于 Mac 系统：

  ```
  pnpm start
  ```

- 对于 Windows 系统：

  ```
  pnpm start:win
  ```

> 具体脚本详情请查看 `apps/ticket-pc/package.json` 文件。

## 其他说明

- 请确保你的环境中已经安装了 Node.js（18以上） 和 pnpm（更为严谨的包管理工具）。
- 安装 pnpm ：`npm install pnpm`
- 在首次启动项目之前，可能需要运行 `pnpm install` 来安装项目依赖。
- 如果有任何问题或疑问，请查阅对应部分的 `package.json` 文件以获取更多信息。
