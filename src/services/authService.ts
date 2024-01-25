import { deleteToken, refreshAccessToken } from "@/lib/actions";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";

export const logout = async (dispatch: AppDispatch) => {
  try {
    deleteToken().then(() => {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      return "Logged out";
    });
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const refresh = async () => {
  try {
    await refreshAccessToken();
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};
