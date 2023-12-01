"use client";
import { loggedIn, login } from "@/services/authService";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const LoginForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    fetchUser();
    function fetchUser() {
      const user = loggedIn(token);
      console.log(user);
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const token = await login(dispatch, {
        username: "exampleUser",
        password: "examplePassword",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
