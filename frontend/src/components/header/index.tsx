"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { BellIcon, DoorOpen, UserIcon } from "lucide-react";
import Popover from "@/components/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { deleteCookies } from "@/utils/cookies.utils";
import { usePathname, useRouter } from "next/navigation";
const index = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const clearAllCookies = async () => {
    await deleteCookies("token");
    await deleteCookies("refreshToken");
    router.push("/login");
  };
  return (
    <header className="flex h-16 justify-between  shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        {" "}
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb className="font-satoshi">
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
        </Breadcrumb>
      </div>
      <div className="flex gap-2 items-center">
        <Button>
          <BellIcon />
        </Button>
        <Popover
          trigger={
            <Button variant={"outline"}>
              <UserIcon />
            </Button>
          }
          content={
            <>
              <Button
                onClick={() => {
                  clearAllCookies();
                }}
              >
                {" "}
                <DoorOpen /> Logout
              </Button>
            </>
          }
        />
      </div>
    </header>
  );
};

export default index;
