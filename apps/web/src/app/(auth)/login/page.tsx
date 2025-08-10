"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Input, Button, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { loginByEmail, loginByMobile } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loginType, setLoginType] = useState<"email" | "phone">("email");

  function handleLogin() {
    form.submit();
  }

  const handleSubmit = async (values: any) => {
    try {
      let result;

      if (loginType === "email") {
        result = await loginByEmail({
          email: values.email,
          password: values.password,
        });
      } else {
        result = await loginByMobile({
          phone: values.phone,
          password: values.password,
        });
      }

      message.success("登录成功");
      router.push("/");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "登录失败");
    }
  };

  const tabItems = [
    {
      key: "email",
      label: "邮箱登录",
    },
    {
      key: "phone",
      label: "手机号登录",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <div className="flex justify-center mb-1">
          <img src="/favicon.png" alt="Logo" className="h-12 w-12" />
        </div>
        <h2 className="text-center text-xl font-bold mb-2">登录账户</h2>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Tabs
            activeKey={loginType}
            items={tabItems}
            centered
            onChange={(key: string) => {
              setLoginType(key as "email" | "phone");
              form.resetFields();
            }}
          />

          {loginType === "email" && (
            <Form.Item
              name="email"
              className="!mb-4"
              rules={[
                { required: true, message: "请输入邮箱地址" },
                { type: "email", message: "请输入有效的邮箱地址" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="邮箱地址" />
            </Form.Item>
          )}

          {loginType === "phone" && (
            <Form.Item
              name="phone"
              className="!mb-4"
              rules={[
                { required: true, message: "请输入手机号" },
                // { pattern: /^1\d{10}$/, message: '请输入有效的手机号' },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="手机号" />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            className="!mb-4"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <div className="flex justify-between mb-4">
            <Button type="link" href="/login/register" className="p-0">
              注册新账户
            </Button>
            <Button type="link" href="/login/forgot-password" className="p-0">
              忘记密码？
            </Button>
          </div>

          <Form.Item>
            <Button type="primary" onClick={handleLogin} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
