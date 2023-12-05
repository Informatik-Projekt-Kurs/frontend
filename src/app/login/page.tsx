"use client";
import { loggedIn, login, logout } from "@/services/authService";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<Object | null>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
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
      await login(dispatch, {
        username: "exampleUser",
        password: "examplePassword"
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
    <div className="flex justify-between items-center flex-row">
      <div className="flex w-[50vw] h-screen bg-base-200">
        <button>Hello World</button>
      </div>
      <div className="flex justify-center items-center w-[50vw] h-screen bg-neutral">
        <div className="flex justify-center flex-col items-center bg-base-200 w-[35vw] h-[600px] rounded-xl">
          <h1 className="text-2xl">Login</h1>
          <p>Already have an account login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
