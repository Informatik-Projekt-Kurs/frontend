"use client";
import { useEffect } from "react";
import { refresh } from "@/services/authService";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { getAccessToken } from "@/lib/actions";

const TokenRefresh = () => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = await getAccessToken();
      if (token === undefined) return;

      try {
        const decodedToken = jwt.decode(token) as JwtPayload;
        if (decodedToken?.exp === undefined) return;
        const exp = decodedToken.exp;

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = exp - currentTime;
        if (timeUntilExpiration < 120) {
          // Refresh if less than 2 minutes left
          await refresh();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkTokenExpiration();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(checkTokenExpiration, 10 * 1000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);
};

export default TokenRefresh;
