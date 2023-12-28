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
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(async () => {
        resolve({
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCZW4iLCJpYXQiOjE3MDM3Nzc5NzksImV4cCI6MTcwMzg2NDM3OX0.0Pa5Tayj9bA0rulxan3lDKHFtJkxTRMjVIExLfdM2mSuZMa_MV1k8DvVEDZ5eaLC6X8IZDzh3godcBrCKlx91Q",
          type: "Bearer",
          refreshToken: "refreshToken",
          id: 2,
          name: "Ben",
          email: "boeckmannben@gmail.com",
          role: "USER"
        });
      }, 1000);
    });

    const result = await res;
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
