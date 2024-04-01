"use client";
import { Fragment, useEffect, type PropsWithChildren } from "react";
import { getTokenExpiration, refreshAccessToken } from "@/lib/actions";

const TokenRefresh = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const exp = await getTokenExpiration();
        if (exp === null || exp === undefined) {
          return;
        }

        const secondsToExpire = Number(exp) - Date.now() / 1000;
        if (Math.round(secondsToExpire) < 20) {
          await refreshAccessToken().catch((error) => {
            console.error("Error refreshing token:", error);
          });
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
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Fragment>{children}</Fragment>
  );
};

export default TokenRefresh;
