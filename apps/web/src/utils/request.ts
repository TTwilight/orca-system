/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
  AxiosHeaders,
} from "axios";
import { notification } from "antd";
import { GetSessionToken, RemoveSessionToken } from "./storage";
import router from "./router";
import { normalizeContentDis } from "./file";

const codeMessage: Record<string, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

// 导入环境变量工具类
import { BASE_API_URL } from "@/constants/env";

// 重定向登录页面
export function redirectLogin() {
  RemoveSessionToken();
  localStorage.removeItem("business");
  setTimeout(() => {
    router.push("/login");
  }, 1000);
}

// SESSION_TOKEN 过期 返回code
/**
 * 会话令牌过期的错误码
 */
export const SESSIONTOKEN_EXPIRED_CODES = {
  // 系统级错误码
  UNAUTHORIZED: "401", // 未授权
  BIZ_UNAUTHORIZED: "BIZ_401", // 业务未授权

  // 用户相关错误码
  USER_NOT_IN_WHITE_LIST: "USER_NOT_IN_WHITE_LIST", // 用户不在白名单
  USER_TOKEN_EXPIRED: "1000_0002", // 用户令牌过期
  USER_TOKEN_INVALID: "1000_0003", // 用户令牌无效
  USER_NOT_EXIST: "1000_0012", // 用户不存在

  // 认证相关错误码
  AUTH_FAILED: "4000_0401", // 认证失败
  AUTH_TOKEN_EXPIRED: "4000_0483", // 认证令牌过期

  // 其他错误码
  ACCESS_DENIED: "3000_0001", // 访问被拒绝
} as const;

// 转换为数组形式
const SESSIONTOKEN_EXPIRED_CODE_LIST = Object.values(
  SESSIONTOKEN_EXPIRED_CODES,
);

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  withCredentials: false,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userToken = GetSessionToken();
    const { data = {}, url = "" } = config;
    const { pageNumber } = data;

    // 构建请求数据
    const reqData = {
      ...data,
      pageNumber: undefined,
      pageNum: pageNumber,
    };

    // 确保 headers 存在并且是 AxiosHeaders 实例
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // 设置自定义headers
    const headers = config.headers as AxiosHeaders;
    headers.set("Authorization", "Bearer " + userToken);

    config.data = reqData;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  async (response: AxiosResponse) => {
    const contentType = response.headers["content-type"];

    // 处理二进制文件响应
    if (
      contentType?.includes("application/octet-stream") ||
      response.config.responseType === "blob"
    ) {
      const contentDisposition = response.headers["content-disposition"] || "";
      // 创建一个符合 AxiosResponse 类型的返回值
      const modifiedResponse: AxiosResponse = {
        ...response,
        data: {
          blob: response.data,
          meta: {
            contentType,
            filename: normalizeContentDis(contentDisposition),
          },
        },
      };
      return modifiedResponse;
    }

    // 处理token过期
    if (SESSIONTOKEN_EXPIRED_CODE_LIST.includes(response.data.code)) {
      notification.error({
        message: "登录错误",
        description: "您的登录信息已过期，请重新登录！",
        duration: 0,
      });
      redirectLogin();
    }

    return response;
  },
  (error: AxiosError) => {
    const response = error.response;

    if (response?.status) {
      const errorText = codeMessage[response.status] || response.statusText;

      notification.error({
        message: `请求错误 ${response.status}`,
        description: errorText,
      });

      if (response.status === 401) {
        redirectLogin();
      }
      return Promise.reject({ msg: errorText || "网络异常" });
    }

    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
    return Promise.reject({ msg: "网络异常" });
  },
);

export default request;
