import React, { useMemo } from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "./scheduler.scss";
import "./overviewscheduler.scss";
import { registerLicense } from "@syncfusion/ej2-base";
import { type Appointment } from "@/types";
import { useRouter } from "next/navigation";

type SchedulerProps = {
  data: Appointment[];
  selectedAppointmentId: number | null;
};

function OverviewScheduler(props: SchedulerProps) {
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

  const predefinedColors = ["#6EE7B7", "#F87171", "#FACC15"];
  const router = useRouter();

  registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE!);

  const onEventClick = (args: { cancel: boolean }) => {
    router.push("/dashboard/bookings");
    args.cancel = true;
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

  const appointmentColors = useMemo(() => {
    return props.data.reduce(
      (acc, appointment) => {
        acc[appointment.id] = predefinedColors[appointment.id % predefinedColors.length];
        return acc;
      },
      {} as Record<number, string>
    );
  }, [props.data]);

  // Calculate scheduler hours whenever appointments change
  const schedulerHours = calculateSchedulerHours(props.data);

  const onEventRendered = (args: { data: Record<string, unknown>; element: HTMLDivElement }) => {
    const appointmentData = args.data as Appointment;
    const color = appointmentColors[appointmentData.id];
    args.element.style.background = color;
    args.element.style.left = "50%";
    args.element.style.transform = "translateX(-50%)";
  };

  return (
    <div className="overviewScheduler">
      <ScheduleComponent
        selectedDate={new Date()}
        height={"500px"}
        eventSettings={eventSettings}
        showHeaderBar={false}
        showTimeIndicator={false}
        eventRendered={onEventRendered}
        key={props.selectedAppointmentId}
        readonly={true}
        eventClick={onEventClick}>
        <ViewsDirective>
          <ViewDirective
            option="WorkWeek"
            startHour={schedulerHours.open}
            endHour={schedulerHours.close}
            eventTemplate={(eventProps: Record<string, unknown>) => {
              return (
                <div
                  className={`z-10 size-full cursor-pointer rounded-[12px] border-primary`}
                  style={{
                    borderWidth: eventProps.id === props.selectedAppointmentId ? "4px" : "0"
                  }}></div>
              );
            }}
          />
        </ViewsDirective>
        <Inject services={[WorkWeek]} />
      </ScheduleComponent>
    </div>
  );
}

export default OverviewScheduler;
