import React, { createContext, useContext, useEffect, useState } from "react";
import { type Company, type CompanyUser } from "@/types";
import { getAccessToken, getUser } from "@/lib/authActions";
import { type ApolloQueryResult, useQuery } from "@apollo/client";
import { getCompany } from "@/lib/graphql/queries";

type CompanyContextType = {
  user: CompanyUser | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;

  company: { getCompany: Company } | undefined;
  companyLoading: boolean;
  refreshCompany: () => Promise<ApolloQueryResult<{ getCompany: Company }>>;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CompanyUser>();
  const {
    loading: companyLoading,
    data: company,
    refetch: refreshCompany
  } = useQuery(getCompany, { variables: { id: user?.associatedCompany }, pollInterval: 300000 });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const userData = await getUser(accessToken);
      setUser(userData as CompanyUser);
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

  return (
    <CompanyContext.Provider value={{ user, loading, refreshUser, company, companyLoading, refreshCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
