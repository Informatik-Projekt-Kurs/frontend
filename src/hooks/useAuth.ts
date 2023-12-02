import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const router = useRouter();

  const redirectToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, redirectToLogin]);

  return { isAuthenticated, redirectToLogin };
};

export default useAuth;
