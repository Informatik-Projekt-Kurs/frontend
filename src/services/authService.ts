import { logIn, logOut, setRefreshToken } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";
import { SignJWT } from "jose";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const secret = new TextEncoder().encode("cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2");

export const login = async (
  dispatch: AppDispatch,
  credentials: { username: string; password: string },
  rememberMe: boolean
) => {
  try {
    console.log("Logging in...");
    console.log("credentials", credentials);
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(async () => {
        resolve({
          accessToken: await new SignJWT({ id: 123, email: "boeckmanawd@gmial.com", name: "Johnny", admin: false })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setIssuer("urn:example:issuer")
            .setAudience("urn:example:audience")
            .setExpirationTime("2h")
            .sign(secret),
          refreshToken: "your_refresh_token_here"
        });
      }, 1000);
    });

    const result = await res;
    dispatch(logIn(result.accessToken));
    if (rememberMe) dispatch(setRefreshToken(result.refreshToken));
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async (dispatch: AppDispatch) => {
  try {
    console.log("Logging out...");
    dispatch(logOut());
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export const loggedIn = (accessToken: string | null) => {
  const decodedUserInfo = { email: "awiodnaowidn" };

  if (accessToken != null) {
    /* try {
      const { exp } = jwt.decode(accessToken) as { exp: number };
      console.log(exp);
      decodedUserInfo = jwt.decode(accessToken);
    } catch (error) {
      console.error("Error decoding token", error);
      decodedUserInfo = null;
    } */
    return decodedUserInfo;
  } else {
    return false;
  }
};

export const refreshAccessToken = async (dispatch: AppDispatch, refreshToken: string | null) => {
  try {
    console.log("Refreshing access token...");
    /* const res = await fetch("your_refresh_token_api_endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    }); 
    if (!res.ok) {
      throw new Error("Token refresh failed");
    }
    */
    const res = new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwMzM2NjIzMCwiZXhwIjoxNzAzMzY2NTAwfQ.iTf0c_JHqXeBwW2WyHgE8OaXKaa1n2Ccv_i6s6ZMg3Y",
          refreshToken: "your_refresh_token_here"
        });
      }, 1000);
    });

    const result: { accessToken: string } = await res;
    dispatch(logIn(result.accessToken));
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};
