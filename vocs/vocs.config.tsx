import * as React from "react";
import { type SidebarItem, defineConfig } from "vocs";

const sidebar: SidebarItem[] = [
  {
    text: "Getting Started",
    link: "/getting-started",
  },
  {
    text: "Components",
    collapsed: false,
    items: [
      {
        text: "Address",
        link: "/components/address",
      },
      {
        text: "Avatar",
        link: "/components/avatar",
      },
      {
        text: "Badge",
        link: "/components/badge",
      },
      {
        text: "Banner",
        link: "/components/banner",
      },
      {
        text: "Container",
        link: "/components/container",
      },
      {
        text: "Text",
        link: "/components/text",
      },
      {
        text: "TransactionResult",
        link: "/components/transaction-result",
      },
      {
        text: "UserBanner",
        link: "/components/user-banner",
      },
    ],
  },
];

export default defineConfig({
  title: "Maiton UI",
  description: "Maiton UI is a UI library for building easy-to-use frames.",
  logoUrl: "/maiton-rounded.png",
  iconUrl: "/favicon.png",
  baseUrl:
    process.env.VERCEL_ENV === "production"
      ? "https://maiton.dev"
      : process.env.VERCEL_URL || "http://localhost:5173",
  sidebar,
});
