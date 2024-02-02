import { deleteToken } from "@/lib/actions";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import { type AppDispatch } from "@/store/store";

export const logout = async (dispatch: AppDispatch) => {
  try {
    await deleteToken().then(() => {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      return "Logged out";
    });
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};
