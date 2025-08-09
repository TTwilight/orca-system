# API 统一响应格式

## 概述

本项目实现了API接口的统一响应格式，所有接口返回的数据格式如下：

```json
{
  "code": "0", // 状态码，0表示成功，非0表示失败
  "data": {}, // 响应数据，可以是对象、数组或null
  "msg": "成功" // 响应消息
}
```

## 实现方式

统一响应格式通过以下几个部分实现：

1. **响应拦截器**：自动将所有控制器返回的数据包装成统一格式
2. **异常过滤器**：捕获所有异常并转换为统一的错误响应格式
3. **响应工具类**：提供便捷方法生成标准响应
4. **自定义异常类**：方便抛出带有错误码的业务异常
5. **错误码常量**：定义系统中使用的所有错误码和错误消息

## 使用方法

### 1. 返回成功响应

在控制器或服务中，可以使用`ResponseUtil`工具类返回成功响应：

```typescript
import { ResponseUtil } from '../common';

// 返回带数据的成功响应
return ResponseUtil.success(data);

// 返回带自定义消息的成功响应
return ResponseUtil.success(data, '创建成功');

// 返回分页数据
return ResponseUtil.page(list, total, current, pageSize);
```

### 2. 抛出业务异常

在服务中，可以使用自定义异常类抛出业务异常：

```typescript
import { BusinessException, ErrorCode } from '../common';

// 抛出带错误码的异常
throw new BusinessException(ErrorCode.USER_EXIST);

// 抛出带自定义消息的异常
throw new BusinessException(ErrorCode.USER_NOT_EXIST, '用户不存在');
```

### 3. 错误码定义

系统中定义了常用的错误码，可以在`error-code.constant.ts`文件中查看和扩展：

```typescript
// 系统级错误码
SUCCESS: 0,       // 成功
FAIL: 1,          // 失败
PARAM_ERROR: 400, // 参数错误

// 业务级错误码
USER_EXIST: 10001,    // 用户已存在
USER_NOT_EXIST: 10002 // 用户不存在
```

## 注意事项

1. 控制器中不需要手动包装响应，拦截器会自动处理
2. 如果返回的数据已经是统一格式（包含code、data、msg字段），拦截器不会重复包装
3. 建议使用自定义异常类抛出业务异常，而不是直接使用NestJS内置的异常类
4. 在添加新的业务功能时，应该在错误码常量文件中定义相关的错误码
