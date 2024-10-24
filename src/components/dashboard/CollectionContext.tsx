import React, { createContext, useContext } from "react";
import { type Company } from "@/types";
import { useQuery } from "@apollo/client";
import { getCompanies } from "@/lib/graphql/queries";

type CollectionContextType = {
  companies: Company[] | undefined;
  loading: boolean;
  refreshCompanies: () => Promise<void>;
};

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const { loading, data: companies = [], refetch } = useQuery(getCompanies, { pollInterval: 300000 });

  const refreshCompanies = async () => {
    await refetch();
  };

  return (
    <CollectionContext.Provider value={{ companies, loading, refreshCompanies }}>{children}</CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
}
