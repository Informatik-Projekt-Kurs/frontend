"use client";
import React from "react";
import { useDashboardData } from "@/components/dashboard/DashboardContext";
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
import { useRouter } from "next/navigation";
import { deleteToken } from "@/lib/authActions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function CompanyBrowse() {
  const { user } = useDashboardData();
  const router = useRouter();

  const { companies } = useSelector((state: RootState) => state.collection);

  const logout = async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-foreground md:text-2xl">Browse Companies</h1>
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

      <div
        className={
          "mt-8 grid w-full gap-6 max-lg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 min-[1900px]:grid-cols-4"
        }>
        {companies.map((company) => (
          <div
            key={company.id}
            className={
              "flex h-[200px] w-full flex-col items-start justify-start gap-y-2 rounded-lg border border-border p-6"
            }>
            <h2 className={"text-2xl font-medium text-foreground"}>{company.name}</h2>
            <p className={"text-base font-normal text-muted-foreground"}>{company.description}</p>
            {/* <Button>{user.companies.includes(company.id) ? "Following" : "Follow"}</Button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyBrowse;
