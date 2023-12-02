import Protected from "@/components/Protected";
import React from "react";

function page() {
  return (
    <div>
      <h1>Private Page</h1>
      <Protected /* redirectTo="/url" */ />
    </div>
  );
}

export default page;
