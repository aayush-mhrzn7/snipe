"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileSwitcher } from "./profile-switcher";

// This is sample data.
const data = {
  versions: [
    { label: "Details", url: "/details" },
    { label: "Change password", url: "/change-password" },
  ],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/",
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      items: [
        {
          title: "Google Scraper",
          url: "/google-scraper",
        },
        {
          title: "Categories",
          url: "/Categories",
        },
        {
          title: "Saved Posts",
          url: "/google-scraper",
        },
        {
          title: "Active Jobs",
          url: "/google-scraper",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props} className="font-satoshi">
      <SidebarHeader>
        <ProfileSwitcher
          versions={data.versions}
          defaultVersion={data?.versions[0]?.url}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
