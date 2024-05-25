"use client";
import React, { useEffect, useState } from "react";
import { deleteToken } from "@/lib/actions";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useDashboardData } from "@/components/dashboard/DashboardContext";

function Bookings() {
  const user = useDashboardData().user;
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

  const [select, setSelect] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [bookingMode, setBookingMode] = useState(0);
  const [bookingContent, setBookingContent] = useState({
    title: "Select your company",
    description: "With which company do you want to book this appointment?",
    select: {
      active: true,
      content: ["Github", "Böckmann GmbH", "MeetMate"]
    },
    calendar: {
      active: false
    },
    progress: 33
  });

  useEffect(() => {
    if (false) setEvents([]); // This is a dummy condition to avoid unused variable warning (events)
  }, []);

  const [bookingResult, setBookingResult] = useState<{ company: string; date: Date | undefined; time: string }>({
    company: "",
    date: new Date(),
    time: ""
  });

  useEffect(() => {
    setFilteredEvents(events.filter((event) => event.Subject.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, events]);

  function updateBookingProgress() {
    if (bookingMode === 1 && select !== "") {
      setBookingResult({ ...bookingResult, company: select });
      setSelect("");
      setBookingContent({
        title: "Select your Date",
        description: "When would you like to book this appointment?",
        select: {
          active: false,
          content: ["13:00 - 14:00", "15:00 - 16:00", "19:00 - 20:30"]
        },
        calendar: {
          active: true
        },
        progress: 66
      });
      setBookingMode(bookingMode + 1);
    } else if (bookingMode === 2) {
      setBookingResult({ ...bookingResult, date });
      setBookingContent({
        title: "Select your Slot",
        description: "At what time would you like to book this appointment?",
        select: {
          active: true,
          content: ["13:00 - 14:00", "15:00 - 16:00", "19:00 - 20:30"]
        },
        calendar: {
          active: false
        },
        progress: 80
      });
      setBookingMode(bookingMode + 1);
    } else if (bookingMode === 3 && select !== "") {
      setBookingResult({ ...bookingResult, time: select });
      setBookingContent({
        title: "Success",
        description: "Your appointment was successfully booked",
        select: {
          active: false,
          content: ["13:00 - 14:00", "15:00 - 16:00", "19:00 - 20:30"]
        },
        calendar: {
          active: false
        },
        progress: 100
      });
      console.log(bookingResult);
    } else if (bookingMode === 0) {
      setBookingContent({
        title: "Select your company",
        description: "With which company do you want to book this appointment?",
        select: {
          active: true,
          content: ["Github", "Böckmann GmbH", "MeetMate"]
        },
        calendar: {
          active: false
        },
        progress: 33
      });
      setBookingMode(1);
    }
  }

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
            <AlertDialogContent className={"border-border text-foreground"}>
              <AlertDialogHeader>
                <AlertDialogTitle>You need help?</AlertDialogTitle>
                <AlertDialogDescription className={"flex flex-wrap gap-2"}>
                  If you need any help or would like to request a new feature contact{" "}
                  <a href={"mailto:boeckmannben@gmail.com"}>&quot;boeckmannben{"<at>"}gmail.com&quot;</a>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={"text-foreground"}>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog>
            <DialogTrigger>
              <Button
                onClick={() => {
                  setBookingMode(0);
                  setSelect("");
                }}
                className={"text-foreground"}>
                <FaPlus className={"mr-1"} />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className={"border-border text-foreground"}>
              <DialogHeader className={"gap-y-3"}>
                <DialogTitle>{bookingContent.title}</DialogTitle>
                <DialogDescription>{bookingContent.description}</DialogDescription>
                <Select onValueChange={setSelect}>
                  <SelectTrigger style={{ display: bookingContent.select.active ? "flex" : "none" }}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className={"border-border"}>
                    {bookingContent.select.content.map((content) => (
                      <SelectItem key={content} value={content}>
                        {content}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Calendar
                  mode="single"
                  className="rounded-md"
                  selected={date}
                  onSelect={setDate}
                  style={{ display: bookingContent.calendar.active ? "block" : "none" }}
                />
              </DialogHeader>
              <DialogFooter>
                <div className={"flex w-full flex-col"}>
                  <div className={"flex justify-end gap-x-4"}>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button onClick={updateBookingProgress} className={"text-foreground"}>
                      Next
                    </Button>
                  </div>
                  <Progress className={"mt-3 h-1"} value={bookingContent.progress} />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4 flex h-fit w-full rounded-[20px] bg-subtle p-6">
        <Scheduler openingHours={{ open: "13:00", close: "19:00" }} data={filteredEvents} />
      </div>
    </div>
  );
}

export default Bookings;
