/**
 * 用户相关的 API 请求
 */
import request from "@/utils/request";

// 定义用户信息接口
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 定义用户列表项接口
export interface UserListItem {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// 定义更新用户信息参数接口
export interface UpdateUserInfoParams {
  name?: string;
  avatar?: string;
  phone?: string;
}

// 定义修改密码参数接口
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

/**
 * 获取当前登录用户信息
 * @returns 用户信息
 */
export async function getCurrentUser() {
  return request.get("/user/current");
}

/**
 * 更新用户信息
 * @param params - 更新参数
 * @returns 更新结果
 */
export async function updateUserInfo(params: UpdateUserInfoParams) {
  return request.put("/user/update", params);
}

/**
 * 修改密码
 * @param params - 修改密码参数
 * @returns 操作结果
 */
export async function changePassword(params: ChangePasswordParams) {
  return request.post("/user/change-password", params);
}

/**
 * 上传用户头像
 * @param file - 头像文件
 * @returns 上传结果，包含头像URL
 */
export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  return request.post("/user/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 获取用户列表
 * @returns 用户列表
 */
export async function getUserList() {
  return request.post("/user/list");
}

/**
 * 删除用户
 * @param userId - 用户ID
 * @returns 操作结果
 */
export async function deleteUser(userId: string) {
  return request.post("/user/delete", { id: userId });
}
