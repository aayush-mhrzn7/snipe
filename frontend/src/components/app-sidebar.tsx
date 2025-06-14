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
import { BowArrow, Target } from "lucide-react";

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
          url: "/categories",
        },
        {
          title: "Saved Posts",
          url: "/saved-posts",
        },
        {
          title: "Active Jobs",
          url: "/active-jobs",
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
        <Link href="/">
          <h2 className="flex gap-2 p-4 text-xl font-bold items-center">
            <BowArrow className="text-primary" />
            SNIPE
          </h2>
        </Link>
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
