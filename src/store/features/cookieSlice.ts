import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  consent: boolean;
};

const initialState: AuthState = {
  consent: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    accept(state) {
      state.consent = true;
    },
    decline(state) {
      state.consent = false;
    }
  }
});

export const { accept, decline } = authSlice.actions;

export default authSlice.reducer;
