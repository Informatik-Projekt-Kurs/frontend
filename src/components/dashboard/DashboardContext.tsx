import React, { createContext, useContext, useEffect, useState } from "react";
import type { Appointment, ClientUser, Company } from "@/types";
import { getAccessToken, getAppointments, getRelevantAppointments, getUser } from "@/lib/authActions";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "@/lib/graphql/queries";

type DashboardContextProps = {
  user: ClientUser | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;

  companies: { getCompanies: Company[] } | undefined;
  refreshCompanies: () => Promise<void>;

  relevantAppointments: Appointment[];
  appointments: Appointment[];
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser>();
  const [userLoading, setUserLoading] = useState(true);

  const [relevantAppointments, setRelevantAppointments] = useState<Appointment[]>([]);
  const [relevantAppointmentsLoading, setRelevantAppointmentsLoading] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const accessToken = await getAccessToken();
      const userData = await getUser(accessToken);
      setUser(userData as ClientUser);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchRelevantAppointments = async () => {
    setRelevantAppointmentsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const relevantAppointmentsData = await getRelevantAppointments(accessToken);
      setRelevantAppointments(relevantAppointmentsData);
    } catch (error) {
      console.error("Failed to fetch relevant appointments", error);
    } finally {
      setRelevantAppointmentsLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setAppointmentsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const appointmentsData = await getAppointments(accessToken);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
    void fetchRelevantAppointments();
    void fetchAppointments();
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

  const loading = companiesLoading || userLoading || relevantAppointmentsLoading || appointmentsLoading;

  return (
    <DashboardContext.Provider
      value={{ user, loading, refreshUser, companies, refreshCompanies, relevantAppointments, appointments }}>
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
