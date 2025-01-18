import React, { createContext, useContext, useEffect, useState } from "react";
import { type Appointment, type Company, type CompanyUser, type User } from "@/types";
import { getAccessToken, getUser } from "@/lib/authActions";
import { type ApolloQueryResult, useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_APPOINTMENTS, GET_CLIENTS, GET_MEMBER, getCompany } from "@/lib/graphql/queries";

type CompanyContextType = {
  user: CompanyUser | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;

  company: { getCompany: Company } | undefined;
  refreshCompany: () => Promise<ApolloQueryResult<{ getCompany: Company }>>;

  members: User[];
  refreshMembers: () => Promise<void>;

  appointments: Appointment[];
  refreshAppointments: () => Promise<ApolloQueryResult<{ getAllAppointments: Appointment[] }>>;
  clients: { getClients: User[] };
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient();
  const [user, setUser] = useState<CompanyUser>();
  const [members, setMembers] = useState<User[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  const {
    loading: companyLoading,
    data: company,
    refetch: refreshCompany
  } = useQuery(getCompany, {
    variables: { id: user?.associatedCompany },
    pollInterval: 300000,
    skip: user?.associatedCompany === undefined
  });

  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    refetch: refreshAppointments
  } = useQuery(GET_ALL_APPOINTMENTS, {
    variables: { companyId: company?.getCompany?.id },
    skip: !Boolean(company?.getCompany?.id), // Skip until we have the company data
    pollInterval: 300000
  });

  const { data: clients = { getClients: [] }, loading: clientsLoading } = useQuery(GET_CLIENTS);

  const [userLoading, setUserLoading] = useState(true);

  const fetchMembers = async () => {
    if (!Boolean(company?.getCompany?.memberIds?.length)) {
      setMembers([]);
      return;
    }

    setMembersLoading(true);
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

          if (Boolean(result.data?.getMember)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            memberData.push(result.data.getMember);
          }
        } catch (error) {
          console.error(`Error fetching member ${memberId}:`, error);
          // Continue with other members even if one fails
          continue;
        }
      }

      setMembers(memberData);
    } catch (error) {
      console.error("Failed to fetch members", error);
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    if (Boolean(company?.getCompany?.memberIds)) {
      void fetchMembers();
    }
  }, [company?.getCompany?.memberIds]);

  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const accessToken = await getAccessToken();
      const userData = await getUser(accessToken);
      setUser(userData as CompanyUser);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const refreshMembers = async () => {
    await fetchMembers();
  };

  const loading = userLoading || companyLoading || membersLoading || appointmentsLoading || clientsLoading;

  return (
    <CompanyContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        company,
        refreshCompany,
        members,
        refreshMembers,
        appointments: appointmentsData?.getAllAppointments ?? [],
        refreshAppointments,
        clients
      }}>
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
