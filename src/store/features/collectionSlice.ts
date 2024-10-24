import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Appointment } from "@/types";

type CollectionState = {
  appointments: Appointment[];
};

const initialState: CollectionState = {
  appointments: [
    {
      id: 1,
      from: new Date(2024, 8, 23, 18, 30),
      to: new Date(2024, 8, 23, 19, 30),
      title: "Scrum Meeting",
      description: "Weekly team sync",
      companyId: "1",
      location: "Office",
      client: null,
      status: "PENDING"
    },
    {
      id: 2,
      from: new Date(2024, 8, 25, 17, 30),
      to: new Date(2024, 8, 25, 18, 30),
      title: "Client Presentation",
      description: "Presenting project progress",
      companyId: "2",
      location: "Conference Room",
      client: null,
      status: "BOOKED"
    },
    {
      id: 3,
      from: new Date(2024, 8, 25, 21, 30),
      to: new Date(2024, 8, 25, 22, 30),
      title: "Client Presentation",
      description: "Presenting project progress",
      companyId: "2",
      location: "Conference Room",
      client: null,
      status: "BOOKED"
    }
  ]
};

export const collectionSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    }
  }
});

export const { setAppointments } = collectionSlice.actions;

export default collectionSlice.reducer;
