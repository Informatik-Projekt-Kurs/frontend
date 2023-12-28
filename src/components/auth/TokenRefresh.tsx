// components/TokenRefresh.js or components/TokenRefresh.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "@/services/authService";
import { RootState } from "@/store/store";
import jwt from "jsonwebtoken";

const TokenRefresh = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.user?.token);

  useEffect(() => {
    if (accessToken) {
      const { exp } = jwt.decode(accessToken) as { exp: number };
      const currentTime = Math.floor(Date.now() / 1000);

      const timeUntilExpiration = exp - currentTime;
      const refreshTime = Math.max(0, timeUntilExpiration - 60); // Refresh 1 minute before expiration

      const refreshTimer = setTimeout(() => {
        refresh();
      }, refreshTime * 1000);

      return () => {
        clearTimeout(refreshTimer);
      };
    }
  }, [dispatch, accessToken]);

  return null; // This component does not render anything
};

export default TokenRefresh;
