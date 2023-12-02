"use client";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Protected: React.FC = () => {
  const { isAuthenticated, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, redirectToLogin]);

  return (
    <div>
      {isAuthenticated ? (
        <p>
          This is a private component. Only authenticated users can see this.
        </p>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default Protected;
