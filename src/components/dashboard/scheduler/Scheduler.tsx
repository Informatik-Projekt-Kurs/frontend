import React from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, Inject } from "@syncfusion/ej2-react-schedule";
import "./scheduler.css";

function Scheduler() {
  const data = [
    {
      Id: 1,
      Subject: "Scrum Meeting",
      Location: "Office",
      StartTime: new Date(2024, 5, 6, 9, 30),
      EndTime: new Date(2024, 5, 6, 10, 30),
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1"
    }
  ];
  const eventSettings = { dataSource: data };

  return (
    <ScheduleComponent height="650px" eventSetings={eventSettings} showHeaderBar={false}>
      <ViewsDirective>
        <ViewDirective option="Week" />
      </ViewsDirective>
      <Inject services={[Week]} />
    </ScheduleComponent>
  );
}

export default Scheduler;
