"use server";

import { type User } from "@/types";
import { cookies } from "next/headers";
import { type ZodError, z } from "zod";

type StoreTokenRequest = {
  token: string;
  refresh_token: string;
};

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: "accessToken",
    value: request.token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRATION_MS ?? 0))
  });

  cookies().set({
    name: "refreshToken",
    value: request.refresh_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXPIRATION_MS ?? 0)),
    path: "/api/test/refresh"
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
      .then(async (data: { accessToken: string; refreshToken: string }) => {
        if (data.accessToken !== undefined) {
          await storeToken({ token: data.accessToken, refresh_token: data.refreshToken });
          return data;
        }
      });
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
  }
}

export async function getUser(): Promise<User | null> {
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
      return response.json() as Promise<User>;
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
  const encodedData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key as keyof typeof data]))
    .join("&");

  try {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodedData
    });
    if (response.ok) {
      const res = (await response.json()) as { accessToken: string; refreshToken: string };
      await storeToken({ token: res.accessToken, refresh_token: res.refreshToken });
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
        errors: { email: "Invalid email or password", password: "Invalid email or password" },
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
  errors: Record<keyof { name: string; email: string; password: string; confirmPassword: string }, string> | undefined;
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
      password: z.string().min(8),
      confirmPassword: z.string().min(8)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });
  const parse = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parse.success) {
    return {
      message: "error",
      errors: {
        name: parse.error.flatten().fieldErrors.name?.[0] ?? "",
        email: parse.error.flatten().fieldErrors.email?.[0] ?? "",
        password: parse.error.flatten().fieldErrors.password?.[0] ?? "",
        confirmPassword: parse.error.flatten().fieldErrors.confirmPassword?.[0] ?? ""
      },
      fieldValues: { name, email, password, confirmPassword }
    };
  }
  const data = parse.data;
  const encodedData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key as keyof typeof data]))
    .join("&");

  try {
    const response = await fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
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
    } else {
      return {
        message: "error",
        errors: {
          name: "Something went wrong",
          email: "Something went wrong",
          password: "Something went wrong",
          confirmPassword: "Something went wrong"
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
