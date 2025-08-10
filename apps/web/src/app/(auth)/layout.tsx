import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orca System",
  description:
    "A modern web application built with Next.js in a monorepo structure",
  icons: {
    icon: "/favicon.png",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="zh">
      <main className="h-full flex flex-col bg-gray-800">{children}</main>
    </div>
  );
}
