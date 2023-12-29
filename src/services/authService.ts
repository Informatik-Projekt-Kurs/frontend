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
    await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "Ben", password: "helloworld123" })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          storeToken({ token: data.token, refresh_token: data.refreshToken });
          dispatch(setUser({ id: data.id, name: data.name, email: data.email, role: data.role }));
          return data;
        }
      })
      .catch((error) => {
        console.error("There was a problem with the Fetch operation:", error);
      });
  } catch (error) {
    console.error("Login failed", error);
    return error;
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
