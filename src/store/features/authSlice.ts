import { CompanyAuthObject } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: CompanyAuthObject | null;
};

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CompanyAuthObject>) {
      state.user = action.payload;
    }
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
