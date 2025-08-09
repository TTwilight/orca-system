# 数据库迁移和种子指南

本文档提供了如何使用TypeORM进行数据库迁移和初始化数据的指南。

## 数据库迁移

### 什么是数据库迁移？

数据库迁移是一种管理数据库结构变更的方式，它允许我们：

- 跟踪数据库结构的变化
- 在不同环境中应用相同的数据库变更
- 在需要时回滚变更
- 保持开发、测试和生产环境的数据库结构一致

### 迁移命令

以下是可用的迁移命令：

```bash
# 生成迁移文件
pnpm run migration:generate src/migrations/MigrationName

# 运行所有未应用的迁移
pnpm run migration:run

# 回滚最近的迁移
pnpm run migration:revert
```

### 生成迁移文件

当你修改了实体类（Entity）后，可以使用以下命令生成迁移文件：

```bash
pnpm run migration:generate src/migrations/AddNewFieldToUser
```

这将比较当前数据库结构和实体定义之间的差异，并生成必要的SQL语句。

### 运行迁移

要应用所有未应用的迁移，运行：

```bash
pnpm run migration:run
```

### 回滚迁移

如果需要回滚最近的迁移，运行：

```bash
pnpm run migration:revert
```

## 数据库种子

### 什么是数据库种子？

数据库种子是用于初始化数据库基础数据的脚本，例如：

- 管理员用户
- 基础配置
- 初始化数据

### 运行种子

要运行种子脚本，执行：

```bash
pnpm run seed
```

### 创建新的种子

1. 在`src/database/seeds/`目录下创建新的种子文件，例如`category.seed.ts`
2. 在`seed.ts`文件中导入并调用新的种子函数

## 开发与生产环境

### 开发环境

在开发环境中，你可以使用TypeORM的自动同步功能（`synchronize: true`）来自动更新数据库结构。但请注意，这可能会导致数据丢失，因此不建议在生产环境中使用。

### 生产环境

在生产环境中：

1. 确保`.env.production`中设置`DB_SYNCHRONIZE=false`
2. 使用迁移命令来更新数据库结构
3. 在部署前测试迁移脚本
4. 在应用迁移前备份数据库

## 最佳实践

1. 每次修改实体后生成迁移文件
2. 将迁移文件提交到版本控制系统
3. 在应用迁移前备份数据库
4. 在生产环境中禁用自动同步
5. 使用种子脚本初始化必要的基础数据