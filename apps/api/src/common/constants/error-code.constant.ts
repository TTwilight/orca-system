/**
 * 错误码常量
 */
export const ErrorCode = {
  // 系统级错误码
  SUCCESS: '0', // 成功
  FAIL: '1', // 失败
  PARAM_ERROR: '400', // 参数错误
  UNAUTHORIZED: '401', // 未授权
  FORBIDDEN: '403', // 禁止访问
  NOT_FOUND: '404', // 资源不存在
  METHOD_NOT_ALLOWED: '405', // 方法不允许
  SERVER_ERROR: '500', // 服务器内部错误

  // 业务级错误码
  USER_EXIST: '10001', // 用户已存在
  USER_NOT_EXIST: '10002', // 用户不存在
  PASSWORD_ERROR: '10003', // 密码错误
  TOKEN_INVALID: '10004', // 令牌无效
  TOKEN_EXPIRED: '10005', // 令牌过期
};
/**
 * 错误消息常量
 */
export const ErrorMessage = {
  // 系统级错误消息
  [ErrorCode.SUCCESS]: '成功',
  [ErrorCode.FAIL]: '失败',
  [ErrorCode.PARAM_ERROR]: '参数错误',
  [ErrorCode.UNAUTHORIZED]: '未授权',
  [ErrorCode.FORBIDDEN]: '禁止访问',
  [ErrorCode.NOT_FOUND]: '资源不存在',
  [ErrorCode.METHOD_NOT_ALLOWED]: '方法不允许',
  [ErrorCode.SERVER_ERROR]: '服务器内部错误',

  // 业务级错误消息
  [ErrorCode.USER_EXIST]: '用户已存在',
  [ErrorCode.USER_NOT_EXIST]: '用户不存在',
  [ErrorCode.PASSWORD_ERROR]: '密码错误',
  [ErrorCode.TOKEN_INVALID]: '令牌无效',
  [ErrorCode.TOKEN_EXPIRED]: '令牌过期',
};
