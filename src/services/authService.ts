import { deleteToken, refreshAccessToken, storeToken } from "@/lib/actions";
import { setUser } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";

export const login = async (dispatch: AppDispatch, credentials: FormData) => {
  try {
    await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: credentials.get("email"),
        password: credentials.get("password")
      })
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
    deleteToken().then(() => {
      dispatch(setUser(null));
      return "Logged out";
    });
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const signup = async (credentials: FormData) => {
  try {
    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.get("name"),
        email: credentials.get("email"),
        password: credentials.get("password")
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        // Success
        return "Account created! Please check your email for a confirmation link.";
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
      .then((data) => {
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
