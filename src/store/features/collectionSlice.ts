import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Appointment, type Company } from "@/types";
import { Role } from "@/types/role";

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
  companies: [
    {
      id: "0",
      name: "GitHub",
      createdAt: new Date(2024, 8, 23).toDateString(),
      description: "GitHub is a web-based platform for version control and collaboration.",
      owner: {
        id: 124,
        name: "John Doe",
        email: "johndoe@mail.com",
        role: Role.COMPANY_ADMIN,
        companyID: "1"
      },
      members: [],
      settings: {
        appointmentDuration: 60,
        appointmentBuffer: 15,
        appointmentTypes: [],
        appointmentLocations: [],
        openingHours: {
          from: "08:00",
          to: "18:00"
        }
      }
    },
    {
      id: "1",
      name: "Vercel",
      createdAt: new Date(2024, 8, 23).toDateString(),
      description: "Vercel is a cloud platform for static sites and Serverless Functions.",
      owner: {
        id: 123,
        name: "John Doe",
        email: "johndoe@mail.com",
        role: Role.COMPANY_ADMIN,
        companyID: "2"
      },
      members: [],
      settings: {
        appointmentDuration: 60,
        appointmentBuffer: 15,
        appointmentTypes: [],
        appointmentLocations: [],
        openingHours: {
          from: "08:00",
          to: "18:00"
        }
      }
    },
    {
      id: "2",
      name: "Google",
      createdAt: new Date(2024, 8, 23).toDateString(),
      description:
        "Google is an American multinational technology company that specializes in Internet-related services and products.",
      owner: {
        id: 125,
        name: "John Doe",
        email: "johndoe@mail.com",
        role: Role.COMPANY_ADMIN,
        companyID: "3"
      },
      members: [],
      settings: {
        appointmentDuration: 60,
        appointmentBuffer: 15,
        appointmentTypes: [],
        appointmentLocations: [],
        openingHours: {
          from: "08:00",
          to: "18:00"
        }
      }
    }
  ]
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
