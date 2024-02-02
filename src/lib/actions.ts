"use server";

import { type CompanyAuthObject } from "@/types";
import { cookies } from "next/headers";
import { type ZodError, z } from "zod";

type StoreTokenRequest = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export async function storeToken(request: StoreTokenRequest) {
  console.log(request);
  cookies().set({
    name: "accessToken",
    value: request.access_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + Number(request.expires_in))
  });

  cookies().set({
    name: "refreshToken",
    value: request.refresh_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    path: "/api/user/refresh"
  });

  cookies().set({
    name: "expiresIn",
    value: request.expires_in.toString(),
    expires: new Date(Date.now() + Number(request.expires_in)),
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });
}

export async function deleteToken() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
}

export async function refreshAccessToken() {
  try {
    if (cookies().get("accessToken") !== null) {
      return;
    }
    await fetch("http://localhost:8080/api/test/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies().get("accessToken")?.value
      },
      body: JSON.stringify({ refreshToken: cookies().get("refreshToken") })
    })
      .then(async (response) => {
        if (response.status === 401) {
          await deleteToken();
          throw new Error("Unauthorized");
        } else if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then(async (data: { accessToken: string; refreshToken: string; expires_in: number }) => {
        if (data.accessToken !== undefined) {
          await storeToken({
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            expires_in: data.expires_in
          });
          return data;
        }
      });
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
  }
}

export async function getUser(): Promise<CompanyAuthObject | null> {
  try {
    if (cookies().get("accessToken") === null) {
      throw new Error("Unauthorized");
    }
    await fetch("http://localhost:8080/api/user/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies().get("accessToken")?.value
      }
    }).then(async (response) => {
      if (response.status === 401) {
        await deleteToken();
        throw new Error("Unauthorized");
      } else if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json() as Promise<CompanyAuthObject>;
    });
    return null;
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
    return null;
  }
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
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
    email: z.string().email({ message: "Please enter your email in format: yourname@example.com" }).min(5),
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
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: encodedData
    });
    if (response.ok) {
      const res = (await response.json()) as { access_token: string; refresh_token: string; expires_in: number };
      console.log(res);
      await storeToken({
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        expires_in: res.expires_in
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
      return {
        message: "error",
        errors: { email: "Invalid email or password", password: undefined! },
        fieldValues: { email, password }
      };
    }
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: { email: errorMap.email?.[0] ?? "", password: errorMap.password?.[0] ?? "" },
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
  fieldValues: { name: string; email: string; password: string; confirmPassword: string };
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
    const response = await fetch("http://localhost:8080/api/user/signup", {
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
