"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { type LoginFormState, type SignupFormState, type StoreTokenRequest, type User } from "@/types";

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: "accessToken",
    value: request.access_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + Number(request.expires_at))
  });

  if (request.refresh_token !== undefined) {
    cookies().set({
      name: "refreshToken",
      value: request.refresh_token,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
  }

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

export async function refreshAccessToken(refreshToken?: string) {
  const response: Response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + refreshToken ?? cookies().get("refreshToken")?.value
    },
    body: null
  });

  if (response.ok) {
    const res = (await response.json()) as {
      access_Token: string;
      expires_at: number;
    };

    if (refreshToken !== undefined) {
      return [res.access_Token, res.expires_at.toString()];
    } else {
      void storeToken({
        access_token: res.access_Token,
        refresh_token: cookies().get("refreshToken")?.value,
        expires_at: res.expires_at.toString()
      });
      return res.access_Token;
    }
  } else if (response.status === 401 || response.status === 403) {
    return undefined;
  } else {
    throw new Error("There was a problem refreshing the access token: " + response.statusText);
  }
}

export async function getUser(accessToken?: string): Promise<User | null> {
  const response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + accessToken ?? cookies().get("accessToken")?.value
    },
    body: undefined
  });

  if (response.ok) {
    return (await response.json()) as User;
  } else if (response.status === 403) {
    return null;
  } else {
    throw new Error("There was a problem fetching the user: " + response.statusText);
  }
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}

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
  const encodedData = new URLSearchParams(data as Record<string, string>).toString();

  const response: Response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/login", {
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
  } else if (response.status === 429) {
    return {
      message: "error",
      errors: { email: "Too many requests", password: "" },
      fieldValues: { email, password }
    };
  } else
    return {
      message: "error",
      errors: { email: "Invalid email or password", password: " " },
      fieldValues: { email, password }
    };
}

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
  const encodedData = new URLSearchParams(data as Record<string, string>).toString();

  const response: Response = await fetch(process.env.FRONTEND_DOMAIN + "/api/user/signup", {
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
    throw new Error("There was a problem registering the user: " + response.statusText);
  }
}
