import React from "react";

function Dashboard() {
  return (
    <nav className="flex min-h-screen items-center">
      <div className="h-screen w-[320px] bg-red-100"></div>
      <div className="h-screen w-[calc(100vw-320px)] bg-red-600 "></div>
    </nav>
  );
}

export default Dashboard;
