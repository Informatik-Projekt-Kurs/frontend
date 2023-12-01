import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  email: string;
  isAdmin: boolean;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    email: "",
    isAdmin: false,
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      value: {
        action.payload;
      }
    },
  },
});
