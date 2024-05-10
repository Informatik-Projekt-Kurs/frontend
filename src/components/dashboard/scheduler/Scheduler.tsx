import React, { useState } from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "./scheduler.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { Button } from "@/components/ui/button";

function Scheduler() {
  const data = [
    {
      Id: 1,
      Subject: "Scrum Meeting",
      Location: "Office",
      StartTime: new Date(2024, 4, 6, 14, 30),
      EndTime: new Date(2024, 4, 6, 15, 30),
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1"
    }
  ];
  const eventSettings = { dataSource: data };

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

  registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfcHRSR2BdVUVxW0E=");

  const onEventClick = (args: { cancel: boolean }) => {
    args.cancel = true;
  };

  return (
    <React.Fragment>
      <div className="absolute z-10 ml-2 mt-3">
        <Button size={"sm"} variant={"outline"} className={"rounded-full text-foreground"} onClick={handlePreviousWeek}>
          -
        </Button>
        <Button size={"sm"} variant={"outline"} className={"rounded-full text-foreground"} onClick={handleNextWeek}>
          +
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
            startHour="13:00"
            endHour="19:00"
            timeScale={{ interval: 60, slotCount: 2 }}
          />
        </ViewsDirective>
        <Inject services={[WorkWeek]} />
      </ScheduleComponent>
    </React.Fragment>
  );
}

export default Scheduler;
