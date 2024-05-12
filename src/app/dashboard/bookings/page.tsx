"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { User } from "@/types";
import { deleteToken, getAccessToken, getUser } from "@/lib/actions";
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
import { useRouter } from "next/navigation";
import Scheduler from "@/components/dashboard/scheduler/Scheduler";
import { FaPlus, FaRegCircleQuestion } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

function Bookings() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<
    Array<{ Id: number; Subject: string; Location: string; StartTime: Date; EndTime: Date; RecurrenceRule: string }>
  >([
    {
      Id: 1,
      Subject: "Scrum Meeting",
      Location: "Office",
      StartTime: new Date(2024, 4, 6, 14, 30),
      EndTime: new Date(2024, 4, 6, 15, 30),
      RecurrenceRule: ""
    },
    {
      Id: 2,
      Subject: "Scrum Meeting",
      Location: "Office",
      StartTime: new Date(2024, 4, 8, 17, 30),
      EndTime: new Date(2024, 4, 8, 18, 30),
      RecurrenceRule: ""
    }
  ]);
  const [filteredEvents, setFilteredEvents] = useState<
    Array<{ Id: number; Subject: string; Location: string; StartTime: Date; EndTime: Date; RecurrenceRule: string }>
  >([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        const fetchedUser = await getUser(accessToken);
        setUser(fetchedUser);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false);
      }
      if (false) setEvents([]); // This is a dummy condition to avoid unused variable warning (events)
    };
    fetchUser().catch(console.error);
  }, []);

  useEffect(() => {
    setFilteredEvents(events.filter((event) => event.Subject.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, events]);

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
      <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
        <header className="flex w-full flex-row items-center justify-between">
          <h1 className="m-4 font-medium text-foreground md:text-2xl">Bookings</h1>
          <div className="flex items-center gap-x-6">
            <Input
              className="w-[320px]"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}></Input>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className={"mr-4"}>
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
        <div className={"mt-2 flex w-full items-center justify-between pl-4 text-foreground"}>
          Your Appointments at a glance. Book a new appointment now!
          <div className={"flex w-fit items-center justify-center gap-x-4 text-foreground"}>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={"secondary"}>
                  <FaRegCircleQuestion className={"mr-1 font-bold"} />
                  Help
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You need help?</AlertDialogTitle>
                  <AlertDialogDescription className={"flex flex-wrap gap-x-2"}>
                    If you need any help or would like to request a new feature contact{" "}
                    <a href={"mailto:boeckmannben@gmail.com"}>&quot;boeckmannben{"<at>"}gmail.com&quot;</a>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={"text-foreground"}>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className={"text-foreground"}>
              <FaPlus className={"mr-1"} />
              Book Appointment
            </Button>
          </div>
        </div>
        <div className="mt-4 flex h-fit w-full rounded-[20px] bg-subtle p-6">
          <Scheduler openingHours={{ open: "13:00", close: "19:00" }} data={filteredEvents} />
        </div>
      </div>
    );
}

export default Bookings;
