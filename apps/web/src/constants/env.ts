/**
 * 环境变量工具类
 * 用于统一获取环境变量，避免直接访问 process.env
 */

// 扩展 process.env.APP_ENV 类型
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: "development" | "product" | "qa" | "stage";
    }
  }
}

// 环境类型
type Environment = "development" | "product" | "qa" | "stage";

// 当前环境
export const APP_ENV = (process.env.APP_ENV || "development") as Environment;

// 是否为开发环境
export const isDevelopment = APP_ENV === "development";

// 是否为测试环境
export const isQA = APP_ENV === "qa";

// 是否为预发布环境
export const isStage = APP_ENV === "stage";

// 是否为生产环境
export const isProduct = APP_ENV === "product";

// API 地址
export const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:8080";

// 获取当前环境名称
export function getEnvironmentName(): string {
  switch (APP_ENV) {
    case "development":
      return "开发环境";
    case "qa":
      return "测试环境";
    case "stage":
      return "预发布环境";
    case "product":
      return "生产环境";
    default:
      return "未知环境";
  }
}

// 导出环境变量对象
export default {
  APP_ENV,
  isDevelopment,
  isQA,
  isStage,
  isProduct,
  BASE_API_URL,
  getEnvironmentName,
};
