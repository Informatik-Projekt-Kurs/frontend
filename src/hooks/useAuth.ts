import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return { user };
};

export default useAuth;
