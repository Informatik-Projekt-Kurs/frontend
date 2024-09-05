import { type ReactThreeFiber } from "@react-three/fiber";
import { type ShaderMaterialParameters } from "three";
import { type shaderMaterial } from "@react-three/drei";

declare global {
  namespace JSX {
    type IntrinsicElements = {
      customShaderMaterial: ReactThreeFiber.Node<ShaderMaterialParameters, typeof shaderMaterial>;
    };
  }
}

// ----- AUTH ----- //

// eslint-disable-next-line no-shadow
export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  COMPANY_MEMBER = "COMPANY_MEMBER",
  COMPANY_ADMIN = "COMPANY_ADMIN"
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: keyof typeof Role;
};

type StoreTokenRequest = {
  access_token: string;
  refresh_token?: string;
  expires_at: string;
};

type LoginFormState = {
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
