# MySQL数据库连接模块

## 概述

这个模块提供了NestJS应用程序与MySQL数据库的连接功能，使用TypeORM作为ORM工具。该模块仅负责数据库连接配置和实体定义，不包含业务逻辑和API接口。

## 配置

docker run -d \
  --name mysql-server \
  --restart unless-stopped \
  -e MYSQL_ROOT_PASSWORD=your_strong_password \
  -e MYSQL_DATABASE=orca_system \
  -e MYSQL_USER=orca_admin \
  -e MYSQL_PASSWORD=myapp_password \
  -p 3306:3306

### 环境变量

在`.env.development`文件中配置以下环境变量：

```
DB_HOST=localhost        # 数据库主机地址
DB_PORT=3306             # 数据库端口
DB_USERNAME=root         # 数据库用户名
DB_PASSWORD=             # 数据库密码
DB_DATABASE=orca_system  # 数据库名称
DB_SYNCHRONIZE=true      # 是否自动同步数据库结构（开发环境建议为true，生产环境必须为false）
```

### 数据库模块

`DatabaseModule`提供了以下功能：

1. 自动连接到MySQL数据库
2. 导出TypeOrmModule，供其他模块使用

## 使用方法

### 创建新的实体

在`src/database/entities/`目录下创建新的实体文件，例如：

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('your_table_name')
export class YourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 添加更多字段...
}
```

### 在具体模块中使用实体

在需要使用数据库实体的模块中，导入TypeOrmModule并注册所需实体：

```typescript
// your-module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [YourService],
  controllers: [YourController],
})
export class YourModule {}
```

### 在服务中使用实体

```typescript
// your-service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class YourService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 实现CRUD操作...
}
```

## 注意事项

1. 在生产环境中，请将`DB_SYNCHRONIZE`设置为`false`，避免自动修改数据库结构
2. 生产环境中的数据库迁移应使用TypeORM的Migration功能
3. 敏感信息（如数据库密码）应通过环境变量或安全的配置管理系统提供，而不是硬编码在代码中