/**
 * 通用 API 请求服务
 * 用于处理一些通用的 API 请求，如文件上传等
 */
import request from "@/utils/request";

// 定义文件上传响应接口
export interface UploadFileResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

/**
 * 上传单个文件
 * @param file - 要上传的文件
 * @param folder - 上传目标文件夹，可选
 * @returns 上传结果
 */
export async function uploadFile(file: File, folder?: string) {
  const formData = new FormData();
  formData.append("file", file);

  if (folder) {
    formData.append("folder", folder);
  }

  return request.post<UploadFileResponse>("/common/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 批量上传文件
 * @param files - 要上传的文件列表
 * @param folder - 上传目标文件夹，可选
 * @returns 上传结果列表
 */
export async function batchUploadFiles(files: File[], folder?: string) {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`files`, file);
  });

  if (folder) {
    formData.append("folder", folder);
  }

  return request.post<UploadFileResponse[]>("/common/batch-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 获取系统配置
 * @returns 系统配置信息
 */
export async function getSystemConfig() {
  return request.get("/common/system-config");
}

/**
 * 获取字典数据
 * @param dictCode - 字典编码
 * @returns 字典数据列表
 */
export async function getDictionary(dictCode: string) {
  return request.get(`/common/dict/${dictCode}`);
}
