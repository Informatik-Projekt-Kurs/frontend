"use server";

import { cookies } from "next/headers";

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
    secure: true
  });

  cookies().set({
    name: "refreshToken",
    value: request.refresh_token,
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
  if (!cookies().get("accessToken")) {
    return { status: 401, message: "No access token" };
  }
  const res = await fetch("http://localhost:8080/api/test/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      /* Authorization: cookies().get("accessToken")?.value */
    }
    /* body: JSON.stringify({ refreshToken: cookies().get("refreshToken") }) */
  });
  const result = await res.json();

  if (result.accessToken) {
    storeToken({ token: result.accessToken, refresh_token: result.refreshToken });
  }
}

export async function getUser() {
  if (!cookies().get("accessToken")) {
    return { status: 401, message: "No access token" };
  }
  const res = await fetch("http://localhost:8080/api/test/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const result = await res.json();

  return result;
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}
