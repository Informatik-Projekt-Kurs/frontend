"use client";
import { useEffect } from "react";
import { getTokenExpiration, refreshAccessToken } from "@/lib/actions";

const TokenRefresh = () => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const exp = await getTokenExpiration();
        if (exp === null || exp === undefined) {
          return;
        }

        const secondsToExpire = (Number(exp) - Date.now()) / 1000;
        if (secondsToExpire < 30) {
          await refreshAccessToken();
          return;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      await checkTokenExpiration();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return null;
};

export default TokenRefresh;
