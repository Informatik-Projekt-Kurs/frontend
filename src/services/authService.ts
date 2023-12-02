import jwt from "jsonwebtoken";
import { logIn, logOut } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";

interface LoginResponse {
  token: string;
}

export const login = async (
  dispatch: AppDispatch,
  credentials: { username: string; password: string }
) => {
  try {
    console.log("Logging in...");
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        });
      }, 1000);
    });

    const result = await res;
    dispatch(logIn(result.token));
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

export const loggedIn = (token: string | null) => {
  let decodedUserInfo = null;

  if (token != null) {
    try {
      decodedUserInfo = jwt.decode(token);
    } catch (error) {
      console.error("Error decoding token", error);
      decodedUserInfo = null;
    }
    return decodedUserInfo;
  } else {
    return false;
  }
};
