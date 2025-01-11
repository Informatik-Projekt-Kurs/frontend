import { type Appointment } from "@/types";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "@/lib/graphql/queries";

export default function AppointmentDisplay(props: {
  data: Appointment;
  selected: boolean;
  onClick: (appointment: Appointment) => void;
}) {
  const { data: company, loading } = useQuery(GET_COMPANY, { variables: { id: props.data.companyId } });
  if (!loading)
    return (
      <div
        onClick={() => {
          props.onClick(props.data);
        }}
        className={`flex h-[100px] w-[350px] cursor-pointer flex-row items-center justify-start gap-x-4 rounded-2xl text-white ${props.selected && "bg-primary"}`}>
        <div
          className={`flex size-[100px] flex-col items-center justify-center rounded-2xl text-white ${!props.selected && "bg-secondary"}`}>
          <p className={`text-xl ${!props.selected && "text-muted-foreground"}`}>
            {new Date(props.data.from).toLocaleString("en-US", { weekday: "short" })}
          </p>
          <p className={`text-2xl font-bold ${!props.selected && "text-primary"}`}>
            {new Date(props.data.from).getDate()}
          </p>
        </div>
        <div className={`flex flex-col items-start justify-start`}>
          <p className="text-xl font-medium">{props.data.title}</p>
          <p className="mb-1 text-base text-[#dddddd]">{company?.getCompany.name}</p> {/* Get Company by ID here */}
          <div
            className={`flex flex-col items-start justify-start rounded-lg px-2 py-1 text-sm text-primary ${props.selected ? "bg-white" : "bg-elevated"}`}>
            {`${String(new Date(props.data.from).getHours()).padStart(2, "0")}:${String(new Date(props.data.from).getMinutes()).padStart(2, "0")}`}
          </div>
        </div>
      </div>
    );
}
