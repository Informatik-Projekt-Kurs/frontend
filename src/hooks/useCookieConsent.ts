import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const useCookieConsent = () => {
  const dispatch: AppDispatch = useDispatch();

  const accept = () => {
    dispatch(accept);
  };

  const decline = () => {
    dispatch(decline);
  };

  const cookieStatus = useSelector((state: RootState) => state.cookie.consent);

  return { accept, decline, cookieStatus };
};

export default useCookieConsent;
