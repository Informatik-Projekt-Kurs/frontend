"use client";
import React, { useEffect, useState } from "react";
import { deleteToken } from "@/lib/authActions.server";
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
import { useDashboardData } from "@/contexts/DashboardContext";
import { type Appointment } from "@/types";
import { GET_AVAILABLE_APPOINTMENTS } from "@/lib/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { BOOK_APPOINTMENT } from "@/lib/graphql/mutations";
import HamburgerMenu from "@/components/dashboard/HamburgerMenu";

function Bookings() {
  const { user, companies, appointments, refreshData } = useDashboardData();
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);
  const router = useRouter();

  const formatDateToISOWithoutTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };

  const [bookingState, setBookingState] = useState({
    step: 0,
    selectedCompany: "",
    selectedDate: new Date(),
    selectedTime: "",
    selectedAppointmentId: "",
    isLoading: false,
    error: null as string | null
  });

  useEffect(() => {
    if (bookingState.step === 2) {
      console.log("Query Variables:", {
        companyId: bookingState.selectedCompany,
        date: formatDateToISOWithoutTime(bookingState.selectedDate)
      });
    }

    console.log(formatDateToISOWithoutTime(bookingState.selectedDate));
  }, [bookingState.step, bookingState.selectedCompany, bookingState.selectedDate]);

  const { data: availableSlots, error: slotsError } = useQuery(GET_AVAILABLE_APPOINTMENTS, {
    variables: {
      companyId: bookingState.selectedCompany,
      date: formatDateToISOWithoutTime(bookingState.selectedDate)
    },
    skip: bookingState.selectedCompany === "" || bookingState.step !== 2,
    fetchPolicy: "network-only",
    onError: (error) => {
      // Log the error for debugging
      console.error("Apollo Error Details:", {
        error,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
        message: error.message,
        name: error.name
      });

      // Check if it's an INTERNAL_ERROR from graphQLErrors
      const isInternalError = error.graphQLErrors?.some((err) => err.extensions?.classification === "INTERNAL_ERROR");

      if (isInternalError) {
        setBookingState((prev) => ({
          ...prev,
          error: "We're experiencing temporary technical difficulties. Please try selecting another date or time."
        }));
        return;
      }

      // Handle other types of errors
      if (error.networkError !== null) {
        setBookingState((prev) => ({
          ...prev,
          error: "Unable to connect to the server. Please check your connection."
        }));
      } else if (error.graphQLErrors?.length > 0) {
        const errorMessage = error.graphQLErrors
          .map((err) => err.message)
          .filter((msg) => !msg.includes("INTERNAL_ERROR")) // Filter out internal error messages
          .join(", ");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setBookingState((prev) => ({
          ...prev,
          error: errorMessage !== "" || "Unable to load appointments. Please try again."
        }));
      } else {
        setBookingState((prev) => ({
          ...prev,
          error: "Unable to load appointments. Please try again."
        }));
      }
    },
    onCompleted: (data) => {
      if (bookingState.error !== null) {
        setBookingState((prev) => ({ ...prev, error: null }));
      }
      if (!Boolean(data?.getAvailableAppointments?.length)) {
        setBookingState((prev) => ({
          ...prev,
          error: "No available appointments found for this date. Please try another date."
        }));
      }
    }
  });

  // Reset error state when moving between steps
  useEffect(() => {
    if (Boolean(slotsError)) {
      setBookingState((prev) => ({ ...prev, error: null }));
    }
  }, [bookingState.step]);

  useEffect(() => {
    const filtered =
      searchQuery === ""
        ? appointments
        : appointments.filter((appointment) => appointment.title?.toLowerCase().includes(searchQuery.toLowerCase()));
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
    const earliestTime = Math.min(...calcAppointments.map((a) => new Date(a.from).getHours()));
    const latestTime = Math.max(...calcAppointments.map((a) => new Date(a.to).getHours()));

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

  const [bookAppointment] = useMutation(BOOK_APPOINTMENT);

  // Calculate scheduler hours whenever appointments change
  const schedulerHours = calculateSchedulerHours(appointments);

  const handleBookAppointment = async () => {
    setBookingState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await bookAppointment({
        variables: {
          appointmentId: bookingState.selectedAppointmentId
        }
      });

      updateBookingStep(4);
      await refreshData();
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
                {companies?.getCompanies
                  .filter((company) => user?.subscribedCompanies?.includes(Number(company.id)) ?? false)
                  .map((company) => (
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
            <Calendar
              mode="single"
              onSelect={handleDateChange}
              selected={bookingState.selectedDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <DialogTitle>Select your Slot</DialogTitle>
            <DialogDescription>At what time would you like to book this appointment?</DialogDescription>
            <Select
              onValueChange={(value) => {
                const [time, id] = value.split("|");
                handleSelectChange(time, "selectedTime");
                setBookingState((prev) => ({
                  ...prev,
                  selectedAppointmentId: id
                }));
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent className={"border-border"}>
                {availableSlots?.getAvailableAppointments
                  ?.filter((slot: Appointment) => slot.Status === "PENDING")
                  .map((slot: Appointment) => {
                    const fromTime = new Date(slot.from).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    });
                    const toTime = new Date(slot.to).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    });

                    return (
                      <SelectItem key={slot.id} value={`${fromTime} - ${toTime}|${slot.id}`}>
                        {fromTime} - {toTime} {slot.title !== undefined && slot.title !== null && `(${slot.title})`}
                      </SelectItem>
                    );
                  })}
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
              <p>
                <b>Company</b>: {companies?.getCompanies.find((c) => c.id === bookingState.selectedCompany)?.name}
              </p>
              <p>
                <b>Date</b>: {bookingState.selectedDate.toDateString()}
              </p>
              <p>
                <b>Time</b>: {bookingState.selectedTime.split("|")[0]}
              </p>
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
    <div className="flex min-h-[calc(100svh-32px)] flex-col items-start justify-start p-8 px-6 lg:min-h-[calc(100svh-96px)]">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="text-foreground m-4 font-medium md:text-2xl">Bookings</h1>
        <div className="flex items-center gap-x-2">
          <Input
            className="hidden w-[200px] md:block md:w-[320px]"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={"mr-4"} asChild>
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
      <div className={"text-foreground mt-2 flex w-full items-center justify-between pl-4"}>
        <p className={"hidden md:block"}>Your Appointments at a glance. Book a new appointment now!</p>
        <div className={"text-foreground flex w-fit items-center justify-center gap-x-4"}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
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
      <div className="bg-subtle mt-4 flex h-fit w-full rounded-[20px] p-6">
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
