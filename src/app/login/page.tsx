"use client";
import { loggedIn, login, logout } from "@/services/authService";
import { RootState } from "@/store/store";
import { userAgent } from "next/server";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<Object | null>();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    fetchUser();
    function fetchUser() {
      const fetchedUser = loggedIn(token);
      console.log("fetchedUser", fetchedUser);
      setUser(fetchedUser);
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
      {!user && (
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      )}
      {user && (
        <button className="btn btn-error" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginForm;
