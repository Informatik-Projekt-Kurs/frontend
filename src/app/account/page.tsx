import Protected from "@/components/auth/Protected";
import TokenRefresh from "@/components/auth/TokenRefresh";
import React from "react";

function Account() {
  return (
    <div>
      <h1>Private Page</h1>
      <Protected /* redirectTo="/url" */ />
      <TokenRefresh />
    </div>
  );
}

export default Account;
