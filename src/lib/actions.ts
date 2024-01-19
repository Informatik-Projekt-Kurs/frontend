"use server";

import { LoginFormSchema } from "@/app/login/page";
import { cookies } from "next/headers";
import { ZodError, z } from "zod";

interface StoreTokenRequest {
  token: string;
  refresh_token: string;
}

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
    if (!cookies().get("accessToken")) {
      return { status: 401, message: "No access token" };
    }
    await fetch("http://localhost:8080/api/test/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        /* Authorization: cookies().get("accessToken")?.value */
      }
      /* body: JSON.stringify({ refreshToken: cookies().get("refreshToken") }) */
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.accessToken) {
          storeToken({ token: data.accessToken, refresh_token: data.refreshToken });
          return data;
        }
      });
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
  }
}

export async function getUser() {
  try {
    if (!cookies().get("accessToken")) {
      return { status: 401, message: "No access token" };
    }
    await fetch("http://localhost:8080/api/test/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error("There was a problem with the Fetch operation: ", error);
  }
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}

export type Fields = {
  email: string;
  password: string;
};

export type FormState = {
  message: string;
  errors: Record<keyof Fields, string> | undefined;
  fieldValues: Fields;
};

export async function loginUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });
  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parse.success) {
    return {
      message: "error",
      errors: {
        email: parse.error.flatten().fieldErrors["email"]?.[0] ?? "",
        password: parse.error.flatten().fieldErrors["password"]?.[0] ?? ""
      },
      fieldValues: { email, password }
    };
  }
  const data = parse.data;

  try {
    return {
      message: "Success",
      errors: undefined,
      fieldValues: {
        email: "",
        password: ""
      }
    };
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: { email: errorMap["email"]?.[0] ?? "", password: errorMap["password"]?.[0] ?? "" },
      fieldValues: { email, password }
    };
  }
  /* try {
    return {
      message: "Success",
      errors: undefined,
      fieldValues: {
        email: "",
        password: ""
      }
    };
    await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    }).then((response) => {
      if (!response.ok) {
        return { status: response.status, message: response.statusText };
      }
      return response.json();
    });
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      errors: { email: errorMap["email"]?.[0] ?? "", password: errorMap["password"]?.[0] ?? "" },
      fieldValues: { email, password }
    };
  } */
}
