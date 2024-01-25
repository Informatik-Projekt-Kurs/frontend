import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Not to be trusted completely. Important Auth checks should be done on the server. This is just for UI/UX.

  return { user, isAuthenticated };
};

export default useAuth;
