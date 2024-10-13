import type { Role } from "./role";

// ----- AUTH ----- //

export type StoreTokenRequest = {
  access_token: string;
  refresh_token?: string;
  expires_at: string;
};

export type LoginFormState = {
  message: string;
  errors: Record<keyof { email: string; password: string }, string> | undefined;
  fieldValues: { email: string; password: string };
};

export type SignupFormState = {
  message: string;
  errors:
    | Record<
        keyof {
          name: string | undefined;
          email: string | undefined;
          password: string | undefined;
          confirmPassword: string | undefined;
        },
        string
      >
    | undefined;
  fieldValues: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

// USERS //

type BaseUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

type CompanyRoles = Role.COMPANY_MEMBER | Role.COMPANY_ADMIN;

export type User<T extends Role = Role> = BaseUser & {
  role: T;
} & (T extends Role.CLIENT
    ? { companies: string[] }
    : T extends CompanyRoles
      ? { companyID: string }
      : NonNullable<unknown>);

// ----- APPOINTMENTS ----- //

export type Appointment = {
  id: number;
  from: Date;
  to: Date;
  title: string;
  description: string;
  companyId: string;
  location: string;
  client: User | null; // null if not booked
  status: "PENDING" | "BOOKED" | "CANCELLED" | "COMPLETED";
};

export type Company = {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  owner: User;
  members: User[];
  settings: {
    appointmentDuration: number;
    appointmentBuffer: number;
    appointmentTypes: string[];
    appointmentLocations: string[];
    openingHours: {
      from: string;
      to: string;
    };
  };
};
