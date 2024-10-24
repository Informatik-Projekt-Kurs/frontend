"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { extractNameInitials } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/lib/authActions";
import Loader from "@/components/layout/Loader";
import { useCompany } from "@/components/dashboard/CompanyContext";
import { UsersTable } from "@/components/dashboard/UsersTable";

export default function Page() {
  const { user, loading, companyLoading, company } = useCompany();
  const router = useRouter();

  const logout = async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (logoutError) {
      console.error("Logout failed", logoutError);
      throw logoutError;
    }
  };

  if (loading || companyLoading) return <Loader />;

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">
          {company?.getCompany.name} (ID: {company?.getCompany.id})
        </h1>
        <div className="flex items-center gap-x-6">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className={"mr-4"}>
              <Button variant="ghost" className="relative size-8 rounded-full">
                <Avatar className="size-10">
                  <AvatarFallback className={"bg-primary"}>{extractNameInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"w-56 border-border"}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/dashboard/settings");
                }}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className={"text-red-500"}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="mt-8 flex h-[600px] w-full flex-col rounded-[20px] px-6">
        <UsersTable />
      </div>
    </div>
  );
}
