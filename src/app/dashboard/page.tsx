"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { memo, useCallback, useState } from "react";
import { deleteToken } from "@/lib/authActions.server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { type Appointment } from "@/types";
import { extractNameInitials } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OverviewScheduler from "@/components/dashboard/scheduler/OverviewScheduler";
import AppointmentDisplay from "@/components/dashboard/AppointmentDisplay";
import { useDashboardData } from "@/contexts/DashboardContext";
import HamburgerMenu from "@/components/dashboard/HamburgerMenu";

// eslint-disable-next-line react/display-name
const LoaderComponent = memo(() => (
  <div className="flex min-h-[calc(100svh-32px)] flex-col items-center justify-center p-8 px-6">
    <div className="border-x-background border-b-background border-t-primary flex size-20 animate-spin items-center justify-center rounded-[50%] border-4 bg-transparent"></div>
    <Image className="absolute" src="/landingLogo.png" alt="" width={40} height={40} priority />
  </div>
));

function Dashboard() {
  const { user, loading, appointments, relevantAppointments } = useDashboardData();
  const router = useRouter();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const handleAppointmentClick = useCallback((appointment: Appointment) => {
    setSelectedAppointmentId((prev) => (appointment.id === prev ? null : appointment.id));
  }, []);

  const logout = useCallback(async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  }, []);

  if (loading || user === null) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col items-center justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="text-muted-foreground m-4 font-medium md:text-2xl">Welcome back, {user?.name}</h1>
        <div className="flex items-center gap-x-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className={"mr-4"}>
              <Button variant="ghost" className="relative size-8 rounded-full">
                <Avatar className="size-10">
                  <AvatarFallback className={"bg-primary"}>{extractNameInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"border-border w-56"}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">{user?.name}</p>
                  <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
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
          <HamburgerMenu />
        </div>
      </header>

      <div className="bg-primary mt-8 flex h-[200px] w-full flex-col items-start justify-center gap-2 rounded-[20px] pl-4 md:pl-12">
        <h2 className="text-3xl font-semibold">MeetMate Dashboard</h2>
        <p className="text-sm">Create your appointments in minutes</p>
        <Link href={"/dashboard/bookings"}>
          <Button className="mt-2" variant={"secondary"}>
            Book now
          </Button>
        </Link>
      </div>

      <div className="bg-subtle mt-8 flex h-fit w-full flex-col justify-start rounded-[20px] py-4 xl:flex-row">
        <div className="flex flex-col items-center justify-start gap-4 p-8">
          <h2 className="text-2xl font-semibold">Upcoming Appointments</h2>
          <div className="mt-2 grid max-h-[500px] flex-col items-center justify-start gap-y-6 overflow-x-hidden overflow-y-auto sm:grid-cols-1 md:grid-cols-2 xl:flex xl:items-start xl:justify-start">
            {relevantAppointments.length !== 0 ? (
              relevantAppointments.map((appointment) => (
                <AppointmentDisplay
                  onClick={handleAppointmentClick}
                  key={appointment.id}
                  data={appointment}
                  selected={appointment.id === selectedAppointmentId}
                />
              ))
            ) : (
              <p className={"text-muted-foreground col-span-2 min-w-80 text-center"}>
                You have no upcoming appointments. <br />
                <Button variant={"secondary"} className="mt-2">
                  <Link href={"/dashboard/bookings"}>Book now</Link>
                </Button>
              </p>
            )}
          </div>
        </div>
        <div className="w-full max-w-5xl flex-col items-start justify-center gap-4 p-8 lg:max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-semibold lg:text-start">Timeline</h2>
          <OverviewScheduler data={appointments} selectedAppointmentId={selectedAppointmentId} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
