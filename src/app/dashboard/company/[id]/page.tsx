"use client";
import { Input } from "@/components/ui/input";
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
import Image from "next/image";
import FollowButton from "@/components/dashboard/FollowButton";
import { useUser } from "@/components/dashboard/UserContext";

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useUser();

  const router = useRouter();

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
        <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">GitHub (ID: {params.id})</h1>
        <div className="flex items-center gap-x-6">
          <Input className="w-[320px]" placeholder="Search"></Input>
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

      <Image
        className={"mt-8 flex w-full rounded-[20px]"}
        src={"https://files.readme.io/d14112d-Cloudsmith-Integrations-Banner-GitHub.png"}
        width={1410}
        height={300}
        alt={""}
      />

      <div className="mt-8 flex h-[600px] w-full flex-col rounded-[20px] px-12">
        <div className={"mt-6 flex h-[200px] w-full items-center justify-between"}>
          <div className={"flex flex-row items-center justify-center"}>
            <Image
              className={"size-[200px] rounded-full"}
              src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
              alt={""}
              width={200}
              height={200}
            />
            <div className={"ml-12 flex flex-col"}>
              <h1 className={"text-4xl font-semibold"}>GitHub</h1>
              <p className={"ml-2 mt-2"}>
                GitHub is a code hosting platform for version control and collaboration. It lets you and others work
                together on projects from anywhere.
              </p>
            </div>
          </div>
          <FollowButton companyId={params.id} />
        </div>
        <p className={"mt-10 text-muted-foreground"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
}
