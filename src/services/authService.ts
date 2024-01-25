import { deleteToken, refreshAccessToken, storeToken } from "@/lib/actions";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import { type AppDispatch } from "@/store/store";
import { type LoginInputs, type RegisterInputs } from "@/types";

export const login = async (dispatch: AppDispatch, credentials: LoginInputs) => {
  try {
    await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then(
        async (data: {
          token: string;
          refreshToken: string;
          id: number;
          name: string;
          email: string;
          role: string;
        }) => {
          if (data.token !== undefined && data.refreshToken !== undefined) {
            await storeToken({ token: data.token, refresh_token: data.refreshToken });
            dispatch(setUser({ id: data.id, name: data.name, email: data.email, role: data.role }));
            dispatch(setIsAuthenticated(true));
            return data;
          }
          return "Login failed";
        }
      )
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

export const signup = async (credentials: RegisterInputs) => {
  try {
    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    })
      .then((data) => {
        // Success
        if (!data.ok) {
          throw new Error("Network error");
        }
        return data.text();
      })
      .catch((error) => {
        console.error("There was a problem with the Fetch operation:", error);
      });
  } catch (error) {
    console.error("Signup failed", error);
    return error;
  }
};

export const verify = async (id: string) => {
  try {
    await fetch(`http://localhost:8080/api/auth/verify/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then(() => {
        // Success
        return "Account verified! Please login.";
      })
      .catch((error) => {
        console.error("There was a problem with the Fetch operation:", error);
      });
  } catch (error) {
    console.error("Verification failed", error);
    return error;
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
