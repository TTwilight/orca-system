"use client";

import React from "react";
import { isDevelopment, isQA, getEnvironmentName } from "@/constants/env";

/**
 * 环境信息组件
 * 仅在开发环境和测试环境中显示当前环境信息
 */
const EnvironmentInfo: React.FC = () => {
  // 只在开发环境和测试环境中显示
  if (!isDevelopment && !isQA) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: isDevelopment ? "#4caf50" : "#ff9800",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        zIndex: 9999,
        opacity: 0.8,
      }}
    >
      {getEnvironmentName()}
    </div>
  );
};

export default EnvironmentInfo;
