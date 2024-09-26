import { type Appointment, type Company } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CollectionState = {
  appointments: Appointment[];
  companies: Company[];
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
  ],
  companies: []
};

export const collectionSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    }
  }
});

export const { setAppointments, setCompanies } = collectionSlice.actions;

export default collectionSlice.reducer;
