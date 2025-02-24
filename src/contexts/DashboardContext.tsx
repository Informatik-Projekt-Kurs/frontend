import React, { createContext, useContext, useEffect, useState } from "react";
import type { Appointment, ClientUser, Company } from "@/types";
import { getAccessToken, getAppointments, getRelevantAppointments, getUser } from "@/lib/authActions.server";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "@/lib/graphql/queries";

type DashboardContextProps = {
  user: ClientUser | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  companies: { getCompanies: Company[] } | undefined;
  relevantAppointments: Appointment[];
  appointments: Appointment[];
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [relevantAppointments, setRelevantAppointments] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: companies, loading: companiesLoading } = useQuery(GET_COMPANIES, {
    onError: (graphQLError) => {
      console.error("GraphQL Error:", graphQLError);
      setError(graphQLError);
    }
  });

  const fetchAllData = async () => {
    console.log("Fetching all dashboard data...");
    setIsLoading(true);

    try {
      const accessToken = await getAccessToken();
      console.log("Access token retrieved:", accessToken !== null ? "Yes" : "No");

      if (accessToken === null) {
        console.error("No access token available");
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getUser(accessToken!);
        console.log("User data retrieved:", userData !== null ? "Yes" : "No");
        setUser(userData as ClientUser);
      } catch (e) {
        console.error("Error fetching user:", e);
      }

      try {
        const relevantAppointmentsData = await getRelevantAppointments(accessToken!);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        setRelevantAppointments(relevantAppointmentsData || []);
      } catch (e) {
        console.error("Error fetching relevant appointments:", e);
      }

      try {
        const appointmentsData = await getAppointments(accessToken!);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        setAppointments(appointmentsData || []);
      } catch (e) {
        console.error("Error fetching appointments:", e);
      }
    } catch (e) {
      console.error("Error in fetchAllData:", e);
      setError(e as Error);
    } finally {
      console.log("Finished fetching data, setting loading to false");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("DashboardProvider mounted, fetching initial data");
    void fetchAllData();
  }, []);

  // For debugging
  useEffect(() => {
    console.log("Current state:", {
      user: user !== null ? "loaded" : "null",
      relevantAppointments: relevantAppointments.length,
      appointments: appointments.length,
      isLoading,
      companiesLoading
    });
  }, [user, relevantAppointments, appointments, isLoading, companiesLoading]);

  const contextValue: DashboardContextProps = {
    user,
    loading: isLoading || companiesLoading,
    refreshData: fetchAllData,
    companies,
    relevantAppointments,
    appointments
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {error !== null ? (
        <div className="p-4 text-red-500">
          Error loading dashboard data. Please try refreshing.
          <pre className="mt-2 text-xs">{error.message}</pre>
        </div>
      ) : (
        children
      )}
    </DashboardContext.Provider>
  );
}

export const useDashboardData = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboardData must be used within a DashboardProvider");
  }
  return context;
};
