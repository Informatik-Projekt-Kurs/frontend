import { CompanyAuthObject } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: CompanyAuthObject | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CompanyAuthObject>) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setUser, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
