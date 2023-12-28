"use client";
import { useEffect } from "react";
import { refresh } from "@/services/authService";
import jwt from "jsonwebtoken";
import { getAccessToken } from "@/lib/actions";

const TokenRefresh = () => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = await getAccessToken();
      if (!token) return;

      try {
        const decodedToken = jwt.decode(token);
        if (!decodedToken || !decodedToken.exp) return;
        const exp = decodedToken.exp;

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = exp - currentTime;
        console.log("Time until token expiration:", timeUntilExpiration);
        if (timeUntilExpiration < 120) {
          // Refresh if less than 2 minutes left
          await refresh();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 10 * 1000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return null; // This component does not render anything
};

export default TokenRefresh;
