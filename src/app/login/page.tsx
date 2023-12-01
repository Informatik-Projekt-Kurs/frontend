"use client";
import { loggedIn, login, logout } from "@/services/authService";
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

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <button className="btn btn-error" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LoginForm;
