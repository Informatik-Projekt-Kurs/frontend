import React, { createContext, useContext, useEffect, useState } from "react";
import { type Appointment, type Company, type CompanyUser, type User } from "@/types";
import { getAccessToken, getUser } from "@/lib/authActions.server";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_APPOINTMENTS, GET_MEMBER, getCompany } from "@/lib/graphql/queries";

type CompanyContextType = {
  user: CompanyUser | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  company: { getCompany: Company } | undefined;
  members: User[];
  appointments: Appointment[];
  clients: { getClients: User[] };
  error: Error | null;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient();
  const [user, setUser] = useState<CompanyUser | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Company query that depends on user
  const {
    loading: companyLoading,
    data: company,
    refetch: refetchCompany
  } = useQuery(getCompany, {
    variables: { id: user?.associatedCompany },
    skip: user?.associatedCompany === undefined,
    onError: (graphQLError) => {
      console.error("GraphQL Error fetching company:", graphQLError);
      setError(graphQLError);
    }
  });

  // Appointments query that depends on company
  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    refetch: refetchAppointments
  } = useQuery(GET_ALL_APPOINTMENTS, {
    variables: { companyId: company?.getCompany?.id },
    skip: company?.getCompany?.id === undefined,
    onError: (graphQLError) => {
      console.error("GraphQL Error fetching appointments:", graphQLError);
    }
  });

  // Clients query
  /* Due to an error in the backend, this code has to be commented out
  const {
    data: clients,
    loading: clientsLoading,
    refetch: refetchClients
  } = useQuery(GET_CLIENTS, {
    onError: (graphQLError) => {
      console.error("GraphQL Error fetching clients:", graphQLError);
      setError(graphQLError);
    }
  }); */

  const clients = {} as { getClients: User[] };
  const clientsLoading = false;
  function refetchClients() {
    console.log("dummy refech clients");
  }

  const fetchMembers = async () => {
    if (company?.getCompany?.memberIds === undefined || company.getCompany.memberIds.length === 0) {
      setMembers([]);
      return;
    }

    console.log("Fetching company members...");
    // We don't set isLoading to true here as it's managed by fetchAllData

    try {
      // Fetch members sequentially to avoid overwhelming the server
      const memberData: User[] = [];

      for (const memberId of company.getCompany.memberIds) {
        try {
          console.log(`Fetching member with ID: ${memberId}`);
          const result = await apolloClient.query({
            query: GET_MEMBER,
            variables: { memberId },
            fetchPolicy: "network-only" // Ensure we get fresh data
          });

          if (result.data?.getMember !== undefined && result.data?.getMember !== null) {
            memberData.push(result.data.getMember as User);
          }
        } catch (fetchError) {
          console.error(`Error fetching member ${memberId}:`, fetchError);
        }
      }

      console.log(`Successfully fetched ${memberData.length} members`);
      setMembers(memberData);
    } catch (memberError) {
      console.error("Failed to fetch members", memberError);
      setError(memberError instanceof Error ? memberError : new Error(String(memberError)));
      setMembers([]);
    }
  };

  const fetchUser = async () => {
    console.log("Fetching company user data...");
    setIsLoading(true);

    try {
      const accessToken = await getAccessToken();

      if (accessToken === null) {
        console.error("No access token available");
        setIsLoading(false);
        return;
      }

      const userData = await getUser(accessToken!);
      console.log("User data retrieved:", userData !== null ? "Yes" : "No");

      setUser(userData as CompanyUser);
    } catch (userError) {
      console.error("Failed to fetch user", userError);
      setError(userError instanceof Error ? userError : new Error(String(userError)));
    } finally {
      // We don't set loading to false here as it will be handled by fetchAllData
    }
  };

  // Main data fetching function
  const fetchAllData = async () => {
    console.log("Fetching all company data...");
    setIsLoading(true);
    setError(null);

    try {
      await fetchUser();

      if (user?.associatedCompany !== undefined) {
        await refetchCompany();
      }

      if (company?.getCompany?.id !== undefined) {
        await refetchAppointments();
      }

      /* await */ refetchClients();
      await fetchMembers();
    } catch (fetchError) {
      console.error("Error in fetchAllData:", fetchError);
      setError(fetchError instanceof Error ? fetchError : new Error(String(fetchError)));
    } finally {
      console.log("Finished fetching all company data, setting loading to false");
      setIsLoading(false);
    }
  };

  // Load members when company data changes
  useEffect(() => {
    if (company?.getCompany?.memberIds !== undefined) {
      void fetchMembers();
    }
  }, [company?.getCompany?.memberIds]);

  // Initial data fetch
  useEffect(() => {
    console.log("CompanyProvider mounted, fetching initial data");
    void fetchAllData();
  }, []);

  // For debugging
  useEffect(() => {
    console.log("Company context state:", {
      user: user !== null ? "loaded" : "null",
      company: company?.getCompany?.id !== undefined ? `ID: ${company.getCompany.id}` : "not loaded",
      members: members.length,
      appointments: appointmentsData?.getAllAppointments?.length ?? 0,
      isLoading,
      companyLoading,
      appointmentsLoading,
      clientsLoading
    });
  }, [user, company, members, appointmentsData, isLoading, companyLoading, appointmentsLoading, clientsLoading]);

  const contextValue: CompanyContextType = {
    user,
    loading: isLoading || companyLoading || appointmentsLoading || clientsLoading,
    refreshData: fetchAllData,
    company,
    members,
    appointments: appointmentsData?.getAllAppointments ?? [],
    clients,
    error
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {error !== null ? (
        <div className="p-4 text-red-500">
          Error loading company data. Please try refreshing.
          <pre className="mt-2 text-xs">{error.message}</pre>
        </div>
      ) : (
        children
      )}
    </CompanyContext.Provider>
  );
}

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
