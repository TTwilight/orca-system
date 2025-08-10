import type { NextConfig } from "next";

// 扩展 process.env.NODE_ENV 类型
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: "development" | "product" | "test" | "qa" | "stage";
    }
  }
}

// 环境类型
type Environment = "development" | "product" | "qa" | "stage";

// 获取当前环境
const AppEnv = (process.env.APP_ENV || "development") as Environment;
console.log(`Building for ${AppEnv} environment`);

// 环境变量配置
const nextConfig: NextConfig = {
  // 输出环境变量到客户端
  env: {
    APP_ENV: AppEnv,
    NODE_ENV: process.env.NODE_ENV,
  },
  // 禁用 X-Powered-By header
  poweredByHeader: false,
  // 开发环境和测试环境下启用源码映射
  productionBrowserSourceMaps: AppEnv === "development" || AppEnv === "qa",
  // 严格模式
  reactStrictMode: true,
  // 输出目录
  distDir: "dist",
  // 图片域名配置
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
