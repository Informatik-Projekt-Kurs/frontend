import { type User } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setUser, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
