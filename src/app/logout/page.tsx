"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/authService";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Press logout below...");
  const handleLogout = async () => {
    try {
      await logout(dispatch);
    } catch (error) {
      console.error(error);
      setStatus("Error logging out");
      throw error;
    }
  };
  return (
    <div>
      {status}{" "}
      <Button onClick={handleLogout} className="btn btn-primary">
        Logout
      </Button>
    </div>
  );
}

export default Logout;
