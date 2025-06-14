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
          <header className="flex h-16 justify-between  shrink-0 items-center gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              {" "}
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              {/* <Breadcrumb className="font-satoshi">
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Snipe</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                      {path == "" ? "Analytics" : path}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
            <div className="flex gap-2 items-center">
              <Button>
                <BellIcon />
              </Button>
              <Button variant={"outline"}>
                <UserIcon />
              </Button>
            </div>
          </header>
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
