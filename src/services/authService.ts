import jwt from "jsonwebtoken";
import { logIn, logOut, setRefreshToken } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  dispatch: AppDispatch,
  credentials: { username: string; password: string }
) => {
  try {
    console.log("Logging in...");
    console.log("credentials", credentials)
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          refreshToken: "your_refresh_token_here",
        });
      }, 1000);
    });

    const result = await res;
    dispatch(logIn(result.accessToken));
    dispatch(setRefreshToken(result.refreshToken));
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async (dispatch: AppDispatch) => {
  try {
    console.log("Logging out...");
    dispatch(logOut());
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const loggedIn = (accessToken: string | null) => {
  let decodedUserInfo = null;

  if (accessToken != null) {
    try {
      decodedUserInfo = jwt.decode(accessToken);
    } catch (error) {
      console.error("Error decoding token", error);
      decodedUserInfo = null;
    }
    return decodedUserInfo;
  } else {
    return false;
  }
};

export const refreshAccessToken = async (
  dispatch: AppDispatch,
  refreshToken: string | null
) => {
  try {
    console.log("Refreshing access token...");
    /* const res = await fetch("your_refresh_token_api_endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    }); 
    if (!res.ok) {
      throw new Error("Token refresh failed");
    }
    */
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          refreshToken: "your_refresh_token_here",
        });
      }, 1000);
    });

    const result: { accessToken: string } = await res;
    dispatch(logIn(result.accessToken));
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};
