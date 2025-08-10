"use client";

import { FC } from "react";
import { useRouterInit } from "@/utils/router";

/**
 * 路由初始化组件
 * 用于在应用根组件中初始化路由实例
 */
const RouterInitializer: FC = () => {
  // 初始化路由实例
  useRouterInit();

  // 这个组件不渲染任何内容
  return null;
};

export default RouterInitializer;
