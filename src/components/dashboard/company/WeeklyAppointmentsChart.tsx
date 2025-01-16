import React, { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type Appointment } from "@/types";

const WeeklyAppointmentsChart = ({ appointments }: { appointments: Appointment[] }) => {
  const chartData = useMemo(() => {
    // Group appointments by week
    const weeklyData = appointments.reduce(
      (
        acc: Record<
          string,
          {
            booked: number;
            cancelled: number;
            completed: number;
            pending: number;
            total: number;
            week: string;
          }
        >,
        appointment: Appointment
      ) => {
        const date = new Date(appointment.from);
        // Get the Monday of the week
        const monday = new Date(date);
        monday.setDate(date.getDate() - date.getDay() + 1);
        const weekKey = monday.toISOString().split("T")[0];

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!acc[weekKey]) {
          acc[weekKey] = {
            week: weekKey,
            total: 0,
            booked: 0,
            cancelled: 0,
            completed: 0,
            pending: 0
          };
        }

        acc[weekKey].total += 1;
        switch (appointment.Status) {
          case "BOOKED":
            acc[weekKey].booked += 1;
            break;
          case "CANCELLED":
            acc[weekKey].cancelled += 1;
            break;
          case "COMPLETED":
            acc[weekKey].completed += 1;
            break;
          case "PENDING":
            acc[weekKey].pending += 1;
            break;
        }

        return acc;
      },
      {}
    );

    // Convert to array and sort by week
    return Object.values(weeklyData).sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());
  }, [appointments]);

  const chartConfig = {
    booked: {
      label: "Booked",
      color: "hsl(var(--chart-2))"
    },
    cancelled: {
      label: "Cancelled",
      color: "hsl(var(--chart-1))"
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-3))"
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-4))"
    }
  };

  const formatWeek = (weekStr: string) => {
    const date = new Date(weekStr);
    return `Week ${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className="mt-8 rounded-lg border border-border p-6">
      <h4 className="mb-4 text-lg font-medium">Appointments per Week</h4>
      <ChartContainer config={chartConfig} className="h-[50vh] w-full">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" tickFormatter={formatWeek} tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => {
              return Math.floor(value).toString();
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="booked" stackId="appointments" fill="var(--color-booked)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="cancelled" stackId="appointments" fill="var(--color-cancelled)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="completed" stackId="appointments" fill="var(--color-completed)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="pending" stackId="appointments" fill="var(--color-pending)" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default WeeklyAppointmentsChart;
