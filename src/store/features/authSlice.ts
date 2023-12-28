import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null
};

const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString("base64");

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      setCookie("auth_token", "");
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      setCookie("auth_token", action.payload);
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    }
  }
});

export const { logOut, logIn, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
