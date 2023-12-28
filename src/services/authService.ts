import { deleteToken, refreshAccessToken, storeToken } from "@/lib/actions";
import { setUser } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";

interface LoginResponse {
  token: string;
  type: string;
  refreshToken: string;
  id: number;
  name: string;
  email: string;
  role: string;
}

export const login = async (dispatch: AppDispatch, credentials: FormData) => {
  try {
    const res = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "Ben", password: "helloworld123" })
    });

    const result = await res.json();
    storeToken({ token: result.token, refresh_token: result.refreshToken });
    dispatch(setUser({ id: result.id, name: result.name, email: result.email, role: result.role }));
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async (dispatch: AppDispatch) => {
  try {
    console.log("Logging out...");
    deleteToken();
    dispatch(setUser(null));
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
