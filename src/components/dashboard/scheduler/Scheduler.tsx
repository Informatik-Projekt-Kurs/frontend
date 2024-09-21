import React, { useEffect, useState } from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "./scheduler.scss";
import { registerLicense } from "@syncfusion/ej2-base";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type Appointment } from "@/types";
import { useToast } from "@/components/ui/use-toast";

type SchedulerProps = {
  openingHours: { open: string; close: string };
  data: Appointment[];
  handleAppointmentChange: (appointment: Appointment) => void;
  handleAppointmentCancel: (appointment: Appointment) => "success" | "error";
};

function Scheduler(props: SchedulerProps) {
  const { toast } = useToast();
  const fieldsData = {
    id: "id",
    subject: { name: "title" },
    startTime: { name: "from" },
    endTime: { name: "to" },
    location: { name: "location" },
    description: { name: "description" },
    status: { name: "status" }
  };
  const eventSettings = { dataSource: props.data, fields: fieldsData };
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Scheduler props", props);
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const predefinedColors = ["#6EE7B7", "#F87171", "#FACC15", "#3B82F6"];

  registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE!);

  const onEventClick = (args: { cancel: boolean }) => {
    console.log("Event clicked", args);
    args.cancel = true;
  };

  const onEventRendered = (args: { element: HTMLDivElement }) => {
    args.element.style.borderColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
  };

  const handleAppointmentCancel = (event: Appointment): void => {
    const now = new Date();
    const timeDifference = (event.from.getTime() - now.getTime()) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference < 24) {
      toast({
        title: "Cancellation Failed",
        description: "You cannot cancel an appointment less than 24 hours before the appointment time.",
        variant: "default",
        className: "border-red-700"
      });
    } else {
      const result = props.handleAppointmentCancel(event);
      if (result === "success") {
        toast({
          title: "Appointment Cancelled",
          description: "The appointment has been successfully cancelled.",
          variant: "default",
          className: "border-emerald-300"
        });
      } else {
        alert("Failed to cancel the appointment. Please try again.");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="absolute z-10 ml-1 mt-3">
        <Button size={"sm"} variant={"outline"} className={"rounded-full text-foreground"} onClick={handlePreviousWeek}>
          <FaArrowLeft size={10} />
        </Button>
        <Button
          size={"sm"}
          variant={"outline"}
          className={"ml-1 rounded-full text-foreground"}
          onClick={handleNextWeek}>
          <FaArrowRight size={10} />
        </Button>
      </div>
      <ScheduleComponent
        selectedDate={currentDate}
        height={"500px"}
        eventSettings={eventSettings}
        showHeaderBar={false}
        eventRendered={onEventRendered}
        readonly={true}
        eventClick={onEventClick}>
        <ViewsDirective>
          <ViewDirective
            option="WorkWeek"
            startHour={props.openingHours.open}
            endHour={props.openingHours.close}
            timeScale={{ interval: 60, slotCount: 2 }}
            eventTemplate={(eventProps: Appointment) => (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={
                      "absolute z-10 ml-[-4px] size-full cursor-pointer rounded-[12px] border-2 border-solid bg-transparent p-2"
                    }
                    style={{
                      borderColor: predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
                    }}>
                    <h2 className={"overflow-hidden text-ellipsis font-bold"}>{eventProps.title}</h2>
                    <div className={"mt-1 flex items-center gap-x-2 text-xs text-muted-foreground"}>
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric"
                      }).format(eventProps.from)}{" "}
                      <FaArrowRight />{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric"
                      }).format(eventProps.to)}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className={"border-border text-foreground"}>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <DialogTitle className="text-lg font-medium leading-none">Appointment Information</DialogTitle>
                      <p className="text-muted-foreground">
                        Do you need to request a change to this appointment or cancel it?
                      </p>
                    </div>
                    <div>
                      <h4 className={"font-medium text-foreground"}>{eventProps.title}</h4>
                      <p>
                        Date:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        }).format(eventProps.from)}
                      </p>
                      <p>
                        From:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric"
                        }).format(eventProps.from)}
                      </p>
                      <p>
                        To:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric"
                        }).format(eventProps.to)}
                      </p>
                      <p>Description: {eventProps.description}</p>
                      <p>Location: {eventProps.location}</p>
                      <p>Status: {eventProps.status}</p>
                      <p>Company ID: {eventProps.companyId}</p>
                      {eventProps.client !== null && <p>Client: {eventProps.client.name}</p>}
                    </div>
                    <Button
                      onClick={() => {
                        props.handleAppointmentChange(eventProps);
                      }}>
                      Request Change
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        handleAppointmentCancel(eventProps);
                      }}>
                      Cancel Appointment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          />
        </ViewsDirective>
        <Inject services={[WorkWeek]} />
      </ScheduleComponent>
    </React.Fragment>
  );
}

export default Scheduler;
