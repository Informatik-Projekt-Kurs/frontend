import Protected from "@/components/Protected";
import TokenRefresh from "@/components/TokenRefresh";
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
