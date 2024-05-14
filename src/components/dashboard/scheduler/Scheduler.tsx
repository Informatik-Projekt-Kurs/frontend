import React, { useState } from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "./scheduler.scss";
import { registerLicense } from "@syncfusion/ej2-base";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

function Scheduler(props: {
  openingHours: { open: string; close: string };
  data: Array<{ Id: number; Subject: string; Location: string; StartTime: Date; EndTime: Date; RecurrenceRule: string }>;
}) {
  const eventSettings = { dataSource: props.data };

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

  registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfcHRSR2BdVUVxW0E=");

  const onEventClick = (args: { cancel: boolean }) => {
    args.cancel = true;
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
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
        readonly={true}
        eventClick={onEventClick}>
        <ViewsDirective>
          <ViewDirective
            option="WorkWeek"
            startHour={props.openingHours.open}
            endHour={props.openingHours.close}
            timeScale={{ interval: 60, slotCount: 2 }}
            eventTemplate={(eventProps: { Subject: string; StartTime: Date; EndTime: Date }) => (
              <div
                className={"absolute z-10 ml-[-4px] size-full rounded-[12px] border-2 border-solid p-2"}
                style={{
                  borderColor: getRandomColor()
                }}>
                <h2 className={"font-bold"}>{eventProps.Subject}</h2>
                <div className={"mt-1 flex items-center gap-x-2 text-xs text-muted-foreground"}>
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric"
                  }).format(eventProps.StartTime)}{" "}
                  <FaArrowRight />{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric"
                  }).format(eventProps.EndTime)}
                </div>
              </div>
            )}
          />
        </ViewsDirective>
        <Inject services={[WorkWeek]} />
      </ScheduleComponent>
    </React.Fragment>
  );
}

export default Scheduler;
