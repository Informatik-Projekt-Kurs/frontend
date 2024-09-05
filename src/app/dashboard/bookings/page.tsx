"use client";
import React, { useEffect, useState } from "react";
import { deleteToken } from "@/lib/authActions";
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
import { type Appointment } from "@/types";

function Bookings() {
  const user = useDashboardData().user;
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      from: new Date(2024, 8, 3, 14, 30),
      to: new Date(2024, 8, 3, 15, 30),
      title: "Scrum Meeting",
      description: "Weekly team sync",
      companyId: "1",
      location: "Office",
      client: null,
      status: "PENDING"
    },
    {
      id: 2,
      from: new Date(2024, 8, 5, 17, 30),
      to: new Date(2024, 8, 5, 18, 30),
      title: "Client Presentation",
      description: "Presenting project progress",
      companyId: "2",
      location: "Conference Room",
      client: null,
      status: "BOOKED"
    },
    {
      id: 3,
      from: new Date(2024, 8, 6, 17, 30),
      to: new Date(2024, 8, 6, 18, 30),
      title: "Client Presentation",
      description: "Presenting project progress",
      companyId: "2",
      location: "Conference Room",
      client: null,
      status: "BOOKED"
    }
  ]);

  useEffect(() => {
    if (false) setAppointments([]); // This is a dummy condition to avoid unused variable warning (events)
  }, []);

  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);

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

  const [bookingResult, setBookingResult] = useState<{ company: string; date: Date | undefined; time: string }>({
    company: "",
    date: new Date(),
    time: ""
  });

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredAppointments(appointments);
      return;
    } else {
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [searchQuery, appointments]);

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

  const handleAppointmentCancel = (appointment: Appointment): "success" | "error" => {
    console.log("Appointment cancelled", appointment);
    // Here you would typically make an API call to cancel the appointment
    // For now, we'll just update the local state
    // const updatedAppointments = appointments.map((app) =>
    //   app.id === cleanedAppointment.id ? { ...app, status: "CANCELLED" } : app
    // );
    // setAppointments(updatedAppointments);
    return "success";
  };

  const handleAppointmentChange = (appointment: Appointment) => {
    // Implement appointment change logic here
    console.log("Appointment change requested", appointment);
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
                  <a href={"mailto:boeckmannben@gmail.com"}>&quot;boeckmannben{"<at>"}gmail.com&quot;</a>
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
                    {bookingContent.progress === 100 ? (
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Done
                        </Button>
                      </DialogClose>
                    ) : (
                      <React.Fragment>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button onClick={updateBookingProgress} className={"text-foreground"}>
                          Next
                        </Button>
                      </React.Fragment>
                    )}
                  </div>
                  <Progress className={"mt-3 h-1"} value={bookingContent.progress} />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4 flex h-fit w-full rounded-[20px] bg-subtle p-6">
        <Scheduler
          openingHours={{ open: "13:00", close: "19:00" }}
          data={filteredAppointments}
          handleAppointmentCancel={handleAppointmentCancel}
          handleAppointmentChange={handleAppointmentChange}
        />
      </div>
    </div>
  );
}

export default Bookings;
