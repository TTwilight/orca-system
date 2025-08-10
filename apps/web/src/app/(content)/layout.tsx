import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Orca System",
  description:
    "A modern web application built with Next.js in a monorepo structure",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <Navigation />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
