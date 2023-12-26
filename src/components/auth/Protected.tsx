"use client";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {
  /** Redirect URL (f.E. /login) */
  redirectTo?: string;
};

function Protected(props: Props) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      if (props.redirectTo) {
        router.push(props.redirectTo);
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, props.redirectTo, router]);

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
}

export default Protected;
