/**
 * 路由工具
 * 用于在非 JSX 代码中使用 Next.js 路由功能
 */
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// 单例模式存储路由实例
class RouterSingleton {
  private static instance: RouterSingleton;
  private router: AppRouterInstance | null = null;

  private constructor() {}

  public static getInstance(): RouterSingleton {
    if (!RouterSingleton.instance) {
      RouterSingleton.instance = new RouterSingleton();
    }
    return RouterSingleton.instance;
  }

  // 设置路由实例
  public setRouter(router: AppRouterInstance): void {
    this.router = router;
  }

  // 获取路由实例
  public getRouter(): AppRouterInstance | null {
    return this.router;
  }

  // 路由跳转
  public push(path: string): void {
    if (!this.router) {
      console.error(
        "Router instance is not set. Make sure to call setRouter first.",
      );
      return;
    }
    this.router.push(path);
  }

  // 路由替换
  public replace(path: string): void {
    if (!this.router) {
      console.error(
        "Router instance is not set. Make sure to call setRouter first.",
      );
      return;
    }
    this.router.replace(path);
  }

  // 路由返回
  public back(): void {
    if (!this.router) {
      console.error(
        "Router instance is not set. Make sure to call setRouter first.",
      );
      return;
    }
    this.router.back();
  }

  // 路由刷新
  public refresh(): void {
    if (!this.router) {
      console.error(
        "Router instance is not set. Make sure to call setRouter first.",
      );
      return;
    }
    this.router.refresh();
  }
}

// 导出单例实例
export const routerInstance = RouterSingleton.getInstance();

// 创建一个 hook 用于在组件中初始化路由
import { useRouter as useNextRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouterInit = (): void => {
  const router = useNextRouter();

  useEffect(() => {
    routerInstance.setRouter(router);
  }, [router]);
};

// 导出路由方法，可以在任何地方使用
export const router = {
  push: (path: string) => routerInstance.push(path),
  replace: (path: string) => routerInstance.replace(path),
  back: () => routerInstance.back(),
  refresh: () => routerInstance.refresh(),
};

export default router;
