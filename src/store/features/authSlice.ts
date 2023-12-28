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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      setCookie("auth_token", "", { maxAge: 60 * 60 * 24 });
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      setCookie("auth_token", action.payload, { maxAge: 60 * 60 * 24 });
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    }
  }
});

export const { logOut, logIn, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
