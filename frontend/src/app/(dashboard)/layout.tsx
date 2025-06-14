import { AppSidebar } from "@/components/app-sidebar";
import FloatingAI from "@/components/floating-ai";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserData } from "@/services/user.service";
import { BellIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Headers from "@/components/header";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserData();
  if (!user || user == undefined) {
    redirect("/login");
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Headers />
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
        <div className="fixed bottom-4 right-4">
          <FloatingAI />
        </div>
      </SidebarProvider>
    </>
  );
};

export default layout;
