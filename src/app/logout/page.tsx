"use client";
import { logout } from "@/services/authService";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Press logout below...");
  const handleLogout = async () => {
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
  };
  return (
    <div>
      {status}{" "}
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default Logout;
