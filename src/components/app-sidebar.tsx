"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Navbar } from "./layout/navbar";
import { CodeIcon, LinkIcon, ShellIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Footer } from "./layout/footer";

const sidebarItems = [
  {
    label: "基础组件",
    icon: <ShellIcon />,
    url: "/",
  },
  {
    label: "联动组件",
    icon: <LinkIcon />,
    url: "/plus",
  },
  {
    label: "工具代码",
    icon: <CodeIcon />,
    url: "/utils",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Navbar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
