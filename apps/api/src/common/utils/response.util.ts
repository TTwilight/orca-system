/**
 * 统一响应工具类
 */
export class ResponseUtil {
  /**
   * 成功响应
   * @param data 响应数据
   * @param msg 响应消息
   * @returns 统一格式的响应对象
   */
  static success<T>(data: T, msg = '成功') {
    return {
      code: '0',
      data,
      msg,
    };
  }

  /**
   * 错误响应
   * @param code 错误码
   * @param msg 错误消息
   * @param data 错误数据
   * @returns 统一格式的响应对象
   */
  static error(code = '1', msg = '操作失败', data = null) {
    return {
      code,
      data,
      msg,
    };
  }

  /**
   * 分页响应
   * @param list 列表数据
   * @param total 总数
   * @param current 当前页
   * @param pageSize 每页条数
   * @returns 统一格式的分页响应对象
   */
  static page<T>(list: T[], total: number, current = 1, pageSize = 10) {
    return this.success({
      list,
      pagination: {
        total,
        current,
        pageSize,
      },
    });
  }
}
