"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { deleteToken, getAccessToken, getUser } from "@/lib/authActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { type User, type Appointment } from "@/types";
import { extractNameInitials } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OverviewScheduler from "@/components/dashboard/scheduler/OverviewScheduler";
import AppointmentDisplay from "@/components/dashboard/AppointmentDisplay";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function Dashboard() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const appointments = useSelector((state: RootState) => state.collection.appointments);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        setUser(await getUser(accessToken));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false);
      }
    };
    fetchUser().catch(console.error);
  }, []);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    console.log("Appointment clicked", appointment);
    // highlight selected appointment
    setSelectedAppointmentId(appointment.id === selectedAppointmentId ? null : appointment.id);
    console.log(selectedAppointmentId);
  };

  const logout = async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };
  if (loading)
    return (
      <div className="flex h-[calc(100%-32px)] flex-col items-center justify-center p-8 px-6">
        <div className="flex size-20 animate-spin items-center justify-center rounded-[50%] border-4 border-x-background border-b-background border-t-primary bg-transparent"></div>
        <Image className={"absolute"} src={"/landingLogo.png"} alt={""} width={40} height={40} />
      </div>
    );
  else
    return (
      <div className="flex flex-col items-center justify-start p-8 px-6">
        <header className="flex w-full flex-row items-center justify-between">
          <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">Welcome back, {user?.name}</h1>
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

        <div className="mt-8 flex h-[200px] w-full flex-col items-start justify-center gap-2 rounded-[20px] bg-primary pl-12">
          <h2 className="text-3xl font-semibold">MeetMate Dashboard</h2>
          <p className="text-sm">Create your appointments in minutes</p>
          <Link href={"/dashboard/bookings"}>
            <Button className="mt-2" variant={"secondary"}>
              Book now
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex h-fit w-full rounded-[20px] bg-subtle py-4">
          <div className="flex flex-col items-center justify-start gap-4 p-8">
            <h2 className="text-2xl font-semibold">Upcoming Appointments</h2>
            <div className="mt-2 flex max-h-[500px] flex-col items-start justify-start gap-y-6 overflow-y-auto overflow-x-hidden">
              {appointments.length !== 0 ? (
                appointments.map((appointment) => (
                  <AppointmentDisplay
                    onClick={handleAppointmentClick}
                    key={appointment.id}
                    data={appointment}
                    selected={appointment.id === selectedAppointmentId}
                  />
                ))
              ) : (
                <p className={"min-w-80 text-center text-muted-foreground"}>
                  You have no upcoming appointments. <br />
                  <Button variant={"secondary"} className="mt-2">
                    <Link href={"/dashboard/bookings"}>Book now</Link>
                  </Button>
                </p>
              )}
            </div>
          </div>
          <div className="items-center-justify-start flex max-w-3xl flex-col gap-4 p-8">
            <h2 className="text-2xl font-semibold">Timeline</h2>
            <OverviewScheduler data={appointments} selectedAppointmentId={selectedAppointmentId} />
          </div>
        </div>
      </div>
    );
}

export default Dashboard;
