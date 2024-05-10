import React from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "./scheduler.css";
import { registerLicense } from "@syncfusion/ej2-base";

function Scheduler() {
  const data = [
    {
      Id: 1,
      Subject: "Scrum Meeting",
      Location: "Office",
      StartTime: new Date(2024, 4, 6, 9, 30),
      EndTime: new Date(2024, 4, 6, 10, 30),
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1"
    }
  ];
  const eventSettings = { dataSource: data };

  registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfcHRSR2BdVUVxW0E=");

  return (
    <ScheduleComponent height="650px" eventSettings={eventSettings} showHeaderBar={false}>
      <ViewsDirective>
        <ViewDirective option="WorkWeek" />
      </ViewsDirective>
      <Inject services={[WorkWeek]} />
    </ScheduleComponent>
  );
}

export default Scheduler;
