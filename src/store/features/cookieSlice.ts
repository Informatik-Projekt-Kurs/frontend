import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    accept(state, action?) {
      state.consent = true;
    },
    decline(state, action?) {
      state.consent = false;
    }
  }
});

export const { accept, decline } = authSlice.actions;

export default authSlice.reducer;
