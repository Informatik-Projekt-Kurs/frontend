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

// Base user properties that all users share
type BaseUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

// Specific user types
type ClientUser = BaseUser & {
  role: Role.CLIENT;
  subscribedCompanies: number[];
};

type CompanyMemberUser = BaseUser & {
  role: Role.COMPANY_MEMBER;
  associatedCompany: string;
};

type CompanyAdminUser = BaseUser & {
  role: Role.COMPANY_ADMIN;
  associatedCompany: string;
};

type AdminUser = BaseUser & {
  role: Role.ADMIN;
};

type CompanyUser = BaseUser & (CompanyMemberUser | CompanyAdminUser);

// Union type for all possible user types
export type User = ClientUser | CompanyMemberUser | CompanyAdminUser | AdminUser;

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
