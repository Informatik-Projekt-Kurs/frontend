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
import { FaPlus, FaRegCircleQuestion, FaArrowLeft } from "react-icons/fa6";
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
import { type Appointment, type Company } from "@/types";

function Bookings() {
  const { user } = useDashboardData();
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      from: new Date(2024, 8, 3, 18, 30),
      to: new Date(2024, 8, 3, 19, 30),
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
      from: new Date(2024, 8, 6, 21, 30),
      to: new Date(2024, 8, 6, 22, 30),
      title: "Client Presentation",
      description: "Presenting project progress",
      companyId: "2",
      location: "Conference Room",
      client: null,
      status: "BOOKED"
    }
  ]);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Github",
      createdAt: "2024-01-01",
      description: "Version control platform",
      owner: user!,
      members: [],
      settings: {
        appointmentDuration: 60,
        appointmentBuffer: 15,
        appointmentTypes: ["Code Review", "Project Planning"],
        appointmentLocations: ["Online", "Office"],
        openingHours: {
          from: "09:00",
          to: "17:00"
        }
      }
    }
    // Add more companies as needed
  ]);

  useEffect(() => {
    if (false) setAppointments([]);
    if (false) setCompanies([]);
  }, []);

  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);
  const router = useRouter();

  const [bookingState, setBookingState] = useState({
    step: 0,
    selectedCompany: "",
    selectedDate: new Date(),
    selectedTime: "",
    isLoading: false,
    error: null as string | null
  });

  useEffect(() => {
    const filtered =
      searchQuery === ""
        ? appointments
        : appointments.filter((appointment) => appointment.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  const handleAppointmentCancel = (appointment: Appointment): "success" | "error" => {
    console.log("Appointment cancelled", appointment);
    // Implement cancellation logic here
    return "success";
  };

  const handleAppointmentChange = (appointment: Appointment) => {
    console.log("Appointment change requested", appointment);
    // Implement change logic here
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

  const updateBookingStep = (step: number) => {
    setBookingState((prev) => ({
      ...prev,
      step,
      error: null // Clear any previous errors when moving to a new step
    }));
  };

  const handleSelectChange = (value: string, field: "selectedCompany" | "selectedTime") => {
    setBookingState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    // eslint-disable-next-line eqeqeq
    if (date != null) {
      setBookingState((prev) => ({
        ...prev,
        selectedDate: date
      }));
    }
  };

  const calculateSchedulerHours = (calcAppointments: Appointment[]): { open: string; close: string } => {
    const DEFAULT_INTERVAL = 6; // 7 hours
    const DEFAULT_START = 9; // Default start at 9 AM
    const DEFAULT_END = 15; // Default end at 3 PM (6 hours later)

    if (calcAppointments.length === 0) {
      return {
        open: `${DEFAULT_START.toString().padStart(2, "0")}:00`,
        close: `${DEFAULT_END.toString().padStart(2, "0")}:00`
      };
    }

    // Find the earliest start time and latest end time
    const earliestTime = Math.min(...calcAppointments.map((a) => a.from.getHours()));
    const latestTime = Math.max(...calcAppointments.map((a) => a.to.getHours()));

    let startHour: number;
    let endHour: number;

    if (latestTime - earliestTime >= DEFAULT_INTERVAL) {
      // Rare case: appointments span more than 6 hours
      startHour = earliestTime;
      endHour = latestTime + 1; // Add 1 hour for padding
    } else {
      // Normal case: shift the 6-hour window to include all appointments
      endHour = Math.min(24, Math.max(latestTime + 1, earliestTime + DEFAULT_INTERVAL));
      startHour = Math.max(0, endHour - DEFAULT_INTERVAL);
    }

    // Ensure we always have a 6-hour window minimum
    if (endHour - startHour < DEFAULT_INTERVAL) {
      endHour = Math.min(24, startHour + DEFAULT_INTERVAL);
    }

    return {
      open: `${startHour.toString().padStart(2, "0")}:00`,
      close: `${endHour.toString().padStart(2, "0")}:00`
    };
  };

  // Calculate scheduler hours whenever appointments change
  const schedulerHours = calculateSchedulerHours(appointments);

  const handleBookAppointment = async () => {
    setBookingState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Log the appointment data
    console.log("Booking appointment with the following details:", {
      company: bookingState.selectedCompany,
      date: bookingState.selectedDate,
      time: bookingState.selectedTime
    });

    try {
      // Simulated API call
      // const response = await fetch('/api/book-appointment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     companyId: bookingState.selectedCompany,
      //     date: bookingState.selectedDate,
      //     time: bookingState.selectedTime,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to book appointment');
      // }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success or failure randomly
      if (Math.random() > 0.2) {
        // 80% success rate
        updateBookingStep(4); // Success step
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      setBookingState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      }));
    } finally {
      setBookingState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const renderBookingStep = () => {
    switch (bookingState.step) {
      case 0:
        return (
          <React.Fragment>
            <DialogTitle>Select your company</DialogTitle>
            <DialogDescription>With which company do you want to book this appointment?</DialogDescription>
            <Select
              onValueChange={(value) => {
                handleSelectChange(value, "selectedCompany");
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className={"border-border"}>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <DialogTitle>Select your Date</DialogTitle>
            <DialogDescription>When would you like to book this appointment?</DialogDescription>
            <Calendar mode="single" selected={bookingState.selectedDate} onSelect={handleDateChange} />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <DialogTitle>Select your Slot</DialogTitle>
            <DialogDescription>At what time would you like to book this appointment?</DialogDescription>
            <Select
              onValueChange={(value) => {
                handleSelectChange(value, "selectedTime");
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent className={"border-border"}>
                {["13:00 - 14:00", "15:00 - 16:00", "19:00 - 20:30"].map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>Please confirm your appointment details:</DialogDescription>
            <div>
              <p>Company: {companies.find((c) => c.id === bookingState.selectedCompany)?.name}</p>
              <p>Date: {bookingState.selectedDate.toDateString()}</p>
              <p>Time: {bookingState.selectedTime}</p>
            </div>
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Your appointment was successfully booked</DialogDescription>
          </React.Fragment>
        );
      default:
        return null;
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
            }}
          />
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
                  updateBookingStep(0);
                }}
                className={"text-foreground"}>
                <FaPlus className={"mr-1"} />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className={"border-border text-foreground"}>
              <DialogHeader className={"gap-y-3"}>
                {renderBookingStep()}
                {bookingState.error !== null && <div className="mt-2 text-red-500">{bookingState.error}</div>}
              </DialogHeader>
              <DialogFooter>
                <div className={"flex w-full flex-col"}>
                  <div className={"flex justify-between gap-x-4"}>
                    {bookingState.step > 0 && bookingState.step < 4 && (
                      <Button
                        onClick={() => {
                          updateBookingStep(bookingState.step - 1);
                        }}
                        variant="outline"
                        disabled={bookingState.isLoading}>
                        <FaArrowLeft className={"mr-1"} />
                        Back
                      </Button>
                    )}
                    <div>
                      {bookingState.step === 4 ? (
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Done
                          </Button>
                        </DialogClose>
                      ) : (
                        <Button
                          onClick={
                            bookingState.step === 3
                              ? handleBookAppointment
                              : () => {
                                  updateBookingStep(bookingState.step + 1);
                                }
                          }
                          className={"text-foreground"}
                          disabled={
                            bookingState.isLoading ||
                            (bookingState.step === 0 && bookingState.selectedCompany === "") ||
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            (bookingState.step === 1 && !bookingState.selectedDate) ||
                            (bookingState.step === 2 && bookingState.selectedTime === "")
                          }>
                          {bookingState.isLoading ? "Loading..." : bookingState.step === 3 ? "Confirm Booking" : "Next"}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Progress className={"mt-3 h-1"} value={(bookingState.step + 1) * 20} />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4 flex h-fit w-full rounded-[20px] bg-subtle p-6">
        <Scheduler
          openingHours={schedulerHours}
          data={filteredAppointments}
          handleAppointmentCancel={handleAppointmentCancel}
          handleAppointmentChange={handleAppointmentChange}
        />
      </div>
    </div>
  );
}

export default Bookings;
