import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return { isAuthenticated };
};

export default useAuth;
