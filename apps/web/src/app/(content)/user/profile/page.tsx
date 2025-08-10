"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUserInfo } from "@/services/user";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
  });
  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // 使用 user 服务的 getCurrentUser 函数获取当前用户信息
      const result = await getCurrentUser();

      if (result.data) {
        setProfile(result.data);
        setFormData({
          fullName: result.data.fullName || "",
          avatar: result.data.avatar || "",
        });
      }
    } catch (err) {
      // 如果是 401 未授权错误，会在 request.ts 中自动处理重定向到登录页面
      setError(err instanceof Error ? err.message : "获取用户信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateStatus("loading");
    setUpdateMessage("");

    if (!profile) return;

    try {
      // 使用 user 服务的 updateUserInfo 函数更新用户信息
      await updateUserInfo({
        name: formData.fullName,
        avatar: formData.avatar,
      });

      setUpdateStatus("success");
      setUpdateMessage("个人信息更新成功");
      fetchUserProfile(); // 重新获取用户信息
    } catch (err) {
      setUpdateStatus("error");
      setUpdateMessage(err instanceof Error ? err.message : "更新失败");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">未找到用户信息</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">个人中心</h1>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">基本信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1 text-gray-900">{profile.username}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <div className="mt-1 text-gray-900">{profile.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                注册时间
              </label>
              <div className="mt-1 text-gray-900">
                {new Date(profile.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">编辑资料</h2>

          {updateMessage && (
            <div
              className={`text-sm ${updateStatus === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {updateMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              姓名
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              头像URL
            </label>
            <input
              type="text"
              id="avatar"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateStatus === "loading"}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${updateStatus === "loading" ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {updateStatus === "loading" ? "保存中..." : "保存修改"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
