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
    })
    .catch((error) => {
      console.error("There was a problem with the Fetch operation:", error);
    });
}

export async function getUser() {
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
    })
    .catch((error) => {
      console.error("There was a problem with the Fetch operation:", error);
    });
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}
