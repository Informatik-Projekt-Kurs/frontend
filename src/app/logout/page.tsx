"use client";
import { logout } from "@/services/authService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function page() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Loading...");
  useEffect(() => {
    logoutUser();
    async function logoutUser() {
      try {
        await logout(dispatch).then((res) => {
          console.log(res);
          setStatus("Logged out");
        });
      } catch (error) {
        console.error(error);
        setStatus("Error logging out");
        throw error;
      }
    }
  }, []);
  return <div>Current logout status: {status}</div>;
}

export default page;
