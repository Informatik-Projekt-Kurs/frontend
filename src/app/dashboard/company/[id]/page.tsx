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
import FollowButton from "@/components/dashboard/FollowButton";
import { useUser } from "@/components/dashboard/UserContext";
import { useQuery } from "@apollo/client";
import { getCompany } from "@/lib/graphql/queries";
import Loader from "@/components/layout/Loader";

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const router = useRouter();
  const { loading, error, data } = useQuery(getCompany, {
    variables: { id: params.id },
    // Optional: configure caching and refetching
    fetchPolicy: "cache-and-network",
    // Optional: refetch every 5 minutes
    pollInterval: 300000
  });

  const logout = async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (logoutError) {
      console.error("Logout failed", logoutError);
      throw logoutError;
    }
  };

  if (loading) return <Loader />;

  if (error !== undefined) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">
          {data.getCompany.name} (ID: {params.id})
        </h1>
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

      <div className="mt-8 flex h-[600px] w-full flex-col rounded-[20px] px-12">
        <div className={"mt-6 flex h-[200px] w-full items-center justify-between"}>
          <div className={"flex flex-row items-center justify-center"}>
            <div
              className={
                "flex size-[200px] items-center justify-center rounded-full bg-primary text-6xl font-medium text-foreground"
              }>
              {extractNameInitials(data.getCompany.name as string)}
            </div>
            <div className={"ml-12 flex flex-col"}>
              <h1 className={"text-4xl font-semibold"}>{data.getCompany.name}</h1>
            </div>
          </div>
          <FollowButton companyId={params.id} />
        </div>
        <p className={"mt-10 text-muted-foreground"}>
          {data.getCompany.description !== "" ? (
            data.getCompany.description
          ) : (
            <i>This company has not provided a description</i>
          )}
        </p>
      </div>
    </div>
  );
}
