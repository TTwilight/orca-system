/**
 * 认证相关的 API 请求
 */
import request from "@/utils/request";
import { SetSessionToken } from "@/utils/storage";

// 定义登录参数接口
export interface LoginEmailParams {
  email: string;
  password: string;
}

export interface LoginMobileParams {
  phone: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

/**
 * 用户邮箱登录
 * @param params - 登录参数
 * @returns 登录结果
 */
export async function loginByEmail(params: LoginEmailParams) {
  const response = await request.post("/auth/loginByEmail", params);
  if (response.data?.data?.token) {
    SetSessionToken(response.data.data.token);
  }
  return response.data;
}

/**
 * 用户手机号登录
 * @param params - 登录参数
 * @returns 登录结果
 */
export async function loginByMobile(params: LoginMobileParams) {
  const response = await request.post("/auth/loginByMobile", params);
  if (response.data?.data?.token) {
    SetSessionToken(response.data.data.token);
  }
  return response.data;
}

/**
 * 用户注册
 * @param params - 注册参数
 * @returns 注册结果
 */
export async function register(params: RegisterParams) {
  const response = await request.post("/auth/register", params);
  if (response.data?.data?.token) {
    SetSessionToken(response.data.data.token);
  }
  return response.data;
}

/**
 * 忘记密码
 * @param params - 忘记密码参数
 * @returns 操作结果
 */
export async function forgotPassword(params: ForgotPasswordParams) {
  return request.post("/auth/forgot-password", params);
}

/**
 * 重置密码
 * @param params - 重置密码参数
 * @returns 操作结果
 */
export async function resetPassword(params: ResetPasswordParams) {
  return request.post("/auth/reset-password", params);
}

/**
 * 验证 token 是否有效
 * @param token - 用户 token
 * @returns 验证结果
 */
export async function validateToken(token: string) {
  return request.post("/auth/validate-token", { token });
}

/**
 * 退出登录
 */
export async function logout() {
  // 清除本地存储的 token
  SetSessionToken("");
  return { success: true };
}
