"use server";

import { cookies } from "next/headers";
import { type ZodError, z } from "zod";
import { type User } from "@/types";

type StoreTokenRequest = {
  access_token: string;
  refresh_token?: string;
  expires_at: string;
};

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: "accessToken",
    value: request.access_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + Number(request.expires_at))
  });

  if (request.refresh_token === undefined) return;
  cookies().set({
    name: "refreshToken",
    value: request.refresh_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  cookies().set({
    name: "expires_at",
    value: request.expires_at,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });
}

export async function deleteToken() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("expires_at");
}

export async function refreshAccessToken() {
  try {
    const response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + cookies().get("refreshToken")?.value
      },
      body: undefined
    });

    if (response.ok) {
      const res = (await response.json()) as {
        access_Token: string;
        expires_at: number;
      };
      void storeToken({
        access_token: res.access_Token,
        refresh_token: cookies().get("refreshToken")?.value,
        expires_at: res.expires_at.toString()
      });
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export async function getUser(): Promise<User | null> {
  try {
    const response = await fetch("http://localhost:3000/api/user/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + cookies().get("accessToken")?.value
      },
      body: undefined
    });

    if (response.ok) {
      return (await response.json()) as User;
    } else {
      return null;
    }
  } catch (error) {
    console.log("There was a problem with the Fetch operation: ", error);
    return null;
  }
}

export const getAccessToken = async () => cookies().get("accessToken")?.value;

export async function getTokenExpiration() {
  return cookies().get("expires_at")?.value;
}

type LoginFormState = {
  message: string;
  errors: Record<keyof { email: string; password: string }, string> | undefined;
  fieldValues: { email: string; password: string };
};

export async function loginUser(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const schema = z.object({
    email: z
      .string()
      .email({
        message: "Please enter your email in format: yourname@example.com"
      })
      .min(5),
    password: z.string().min(8, { message: "Your Password must be at least 8 characters long" })
  });
  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parse.success) {
    return {
      message: "error",
      errors: {
        email: parse.error.flatten().fieldErrors.email?.[0] ?? "",
        password: parse.error.flatten().fieldErrors.password?.[0] ?? ""
      },
      fieldValues: { email, password }
    };
  }
  const data = parse.data;
  /* const encodedData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key as keyof typeof data]))
    .join("&"); */

  const encodedData = new URLSearchParams(data as Record<string, string>).toString();

  try {
    const response = await fetch("https://ipk-frontend.netlify.app/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: encodedData
    });
    if (response.ok) {
      const res = (await response.json()) as {
        access_Token: string;
        expires_at: number;
        refresh_Token: string;
      };
      void storeToken({
        access_token: res.access_Token,
        refresh_token: res.refresh_Token,
        expires_at: res.expires_at.toString()
      });
      return {
        message: "success",
        errors: undefined,
        fieldValues: {
          email: "",
          password: ""
        }
      };
    } else {
      console.log(response.status);
      if (response.status === 429)
        return {
          message: "error",
          errors: { email: "Too many requests", password: "" },
          fieldValues: { email, password }
        };
      else
        return {
          message: "error",
          errors: { email: "Invalid email or password", password: " " },
          fieldValues: { email, password }
        };
    }
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: {
        email: errorMap.email?.[0] ?? "",
        password: errorMap.password?.[0] ?? ""
      },
      fieldValues: { email, password }
    };
  }
}

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

export async function registerUser(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const schema = z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(8)
    })
    .refine((data) => data.password === confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });
  const parse = schema.safeParse({
    name,
    email,
    password
  });

  if (!parse.success) {
    return {
      message: "error",
      errors: {
        name: parse.error.flatten().fieldErrors.name?.[0] ?? "",
        email: parse.error.flatten().fieldErrors.email?.[0] ?? "",
        password: parse.error.flatten().fieldErrors.password?.[0] ?? "",
        confirmPassword: ""
      },
      fieldValues: { name, email, password, confirmPassword }
    };
  }
  const data = parse.data;
  /* const encodedData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key as keyof typeof data]))
    .join("&"); */
  const encodedData = new URLSearchParams(data as Record<string, string>).toString();

  try {
    const response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: encodedData
    });
    if (response.ok) {
      return {
        message: "success",
        errors: undefined,
        fieldValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      };
    } else if (response.status === 409) {
      return {
        message: "error",
        errors: {
          name: undefined!,
          email: "This email is already taken",
          password: undefined!,
          confirmPassword: undefined!
        },
        fieldValues: { name, email, password, confirmPassword }
      };
    } else {
      return {
        message: "error",
        errors: {
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        fieldValues: { name, email, password, confirmPassword }
      };
    }
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: {
        name: errorMap.name?.[0] ?? "",
        email: errorMap.email?.[0] ?? "",
        password: errorMap.password?.[0] ?? "",
        confirmPassword: errorMap.confirmPassword?.[0] ?? ""
      },
      fieldValues: { name, email, password, confirmPassword }
    };
  }
}
