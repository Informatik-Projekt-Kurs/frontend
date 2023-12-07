"use client";
import { loggedIn, login, logout } from "@/services/authService";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<Object | null>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [topLogin, setTopLogin] = useState<number>(225 * 1.5);

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
      await login(
        dispatch,
        {
          username: "exampleUser",
          password: "examplePassword"
        },
        true
      );
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
      <div className="flex w-[50vw] h-screen bg-base-200 max-lg:hidden"></div>
      <div className="flex justify-center overflow-hidden items-center flex-col w-[50vw] max-lg:w-screen h-screen bg-neutral">
        <motion.div
          animate={{ top: topLogin }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="flex relative justify-center flex-col items-center bg-base-200 w-[35vw] max-w-[600px] max-lg:w-[80vw] h-[550px] rounded-xl border-[1px] border-primary top-[550px]"
          style={{ boxShadow: "0px 0px 6px 0px #4586E6" }}>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p>
            Don’t have an account yet?{" "}
            <Link onClick={() => setTopLogin(-1000 + 225)} href="#" className="btn btn-link px-1 no-underline">
              Sign Up!
            </Link>
          </p>
          <div className="divider"></div>
          <div className="flex justify-center items-center flex-col gap-6 mt-4">
            <input className="input input-primary bg-neutral w-full max-w-[400px]" type="email" placeholder="Email" />
            <input
              className="input input-primary bg-neutral w-full max-w-[400px]"
              type="password"
              placeholder="Password"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-center items-center">
                <input type="checkbox" className="checkbox checkbox-primary" id="rememberCheckbox" />
                <label
                  className="btn btn-ghost hover:bg-transparent p-1 bg-transparent no-underline btn-sm"
                  htmlFor="rememberCheckbox">
                  Remember Me
                </label>
              </div>
              <Link className="btn btn-link no-underline" href="#">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-primary w-full max-w-[400px]" onClick={handleLogin}>
              Login
            </button>
          </div>
        </motion.div>

        <motion.div
          animate={{ top: topLogin + 1000 / 2, opacity: 1 }}
          transition={{ duration: 1.2, ease: "backInOut" }}
          initial={{ top: 2000, opacity: 0 }}
          className="flex relative justify-center flex-col items-center bg-base-200 w-[35vw] max-w-[600px] max-lg:w-[80vw] h-[700px] rounded-xl border-[1px] border-primary"
          style={{ boxShadow: "0px 0px 6px 0px #4586E6" }}>
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p>
            Already have an account?{" "}
            <Link onClick={() => setTopLogin(225 * 1.5)} href="#" className="btn btn-link px-1 no-underline">
              Login
            </Link>
          </p>
          <div className="divider"></div>
          <div className="flex justify-center items-center flex-col gap-6 mt-4">
            <input className="input input-primary bg-neutral w-full max-w-[400px]" type="text" placeholder="Name" />
            <input className="input input-primary bg-neutral w-full max-w-[400px]" type="email" placeholder="Email" />
            <input
              className="input input-primary bg-neutral w-full max-w-[400px]"
              type="password"
              placeholder="Password"
            />
            <input
              className="input input-primary bg-neutral w-full max-w-[400px]"
              type="password"
              placeholder="Repeat Password"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-center items-center">
                <input type="checkbox" className="checkbox checkbox-primary" id="rememberCheckbox" />
                <label
                  className="btn btn-ghost hover:bg-transparent p-1 bg-transparent no-underline btn-sm"
                  htmlFor="rememberCheckbox">
                  Remember Me
                </label>
              </div>
              <Link className="btn btn-link no-underline" href="#">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-primary w-full max-w-[400px]" onClick={handleLogin}>
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
