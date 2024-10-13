import React, { createContext, useContext } from "react";
import type { User } from "@/types";

type DashboardContextProps = {
  user: User;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ user: User; children: React.ReactNode }> = ({ user, children }) => {
  return <DashboardContext.Provider value={{ user }}>{children}</DashboardContext.Provider>;
};

export const useDashboardData = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (context === null) {
    throw new Error("useDashboardData must be used within a UserProvider");
  }
  return context!;
};
