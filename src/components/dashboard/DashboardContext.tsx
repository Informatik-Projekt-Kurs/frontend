import React, { createContext, useContext, useEffect, useState } from "react";
import type { ClientUser, Company } from "@/types";
import { getAccessToken, getUser } from "@/lib/authActions";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "@/lib/graphql/queries";

type DashboardContextProps = {
  user: ClientUser | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;

  companies: { getCompanies: Company[] } | undefined;
  companiesLoading: boolean;
  refreshCompanies: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser>();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const userData = await getUser(accessToken);
      setUser(userData as ClientUser);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const {
    loading: companiesLoading,
    data: companies = { getCompanies: [] },
    refetch
  } = useQuery(GET_COMPANIES, {
    pollInterval: 300000,
    onError: (error) => {
      console.error("GraphQL Error:", error);
    }
  });

  const refreshCompanies = async () => {
    await refetch();
  };

  return (
    <DashboardContext.Provider value={{ user, loading, refreshUser, companies, companiesLoading, refreshCompanies }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardData = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (context === null) {
    throw new Error("useDashboardData must be used within a DashboardProvider");
  }
  return context!;
};
