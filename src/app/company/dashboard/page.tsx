"use client";
import React from "react";
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
import { useCompany } from "@/components/dashboard/CompanyContext";
import { deleteToken } from "@/lib/authActions";
import Loader from "@/components/layout/Loader";
import WeeklyAppointmentsChart from "@/components/dashboard/company/WeeklyAppointmentsChart";

function Page() {
  const { user, loading, company, appointments, clients } = useCompany();

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

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">
          Welcome back to <b>{company?.getCompany?.name}</b>
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
              <DropdownMenuItem onClick={logout} className={"text-red-500"}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className={"mt-8 size-full"}>
        <div className={"flex min-w-full items-center justify-between gap-x-6"}>
          <div
            className={
              "flex min-h-40 w-1/3 flex-col items-start justify-center gap-y-1 rounded-lg border border-border p-6"
            }>
            <h4 className={"text-lg font-medium"}>Total Appointments</h4>
            <h3 className={"text-2xl font-bold text-foreground"}>{appointments?.length}</h3>
            <p className={"text-sm text-muted-foreground"}>The total amount of Appointments</p>
          </div>
          <div
            className={
              "flex min-h-40 w-1/3 flex-col items-start justify-center gap-y-1 rounded-lg border border-border p-6"
            }>
            <h4 className={"text-lg font-medium"}>Booked Appointments</h4>
            <h3 className={"text-2xl font-bold text-foreground"}>
              {appointments?.filter((appointment) => appointment.Status === "BOOKED").length}
            </h3>
            <p className={"text-sm text-muted-foreground"}>Currently booked appointments</p>
          </div>
          <div
            className={
              "flex min-h-40 w-1/3 flex-col items-start justify-center gap-y-1 rounded-lg border border-border p-6"
            }>
            <h4 className={"text-lg font-medium"}>Clients</h4>
            <h3 className={"text-2xl font-bold text-foreground"}>{clients?.getClients?.length}</h3>
            <p className={"text-sm text-muted-foreground"}>The amount of clients subscribed to this company</p>
          </div>
        </div>
      </div>

      <WeeklyAppointmentsChart appointments={appointments} />
    </div>
  );
}

export default Page;
