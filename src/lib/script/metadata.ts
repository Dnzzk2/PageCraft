import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "PageCraft",
  description: "快速生成后台管理系统模板代码",
  icons: {
    icon: [
      { url: "/logo/favicon-16x16.png", sizes: "16x16" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32" },
      { url: "/logo/favicon-192x192.png", sizes: "192x192" },
      { url: "/logo/favicon-512x512.png", sizes: "512x512" },
      { url: "/logo/favicon-2048x2048.png", sizes: "2048x2048" },
    ],
    apple: [{ url: "/logo/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/logo/favicon.ico"],
  },
};
