import React, { createContext, useContext, useEffect, useState } from "react";
import { type ClientUser } from "@/types";
import { getAccessToken, getUser } from "@/lib/authActions";

type UserContextType = {
  user: ClientUser | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
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

  return <UserContext.Provider value={{ user, loading, refreshUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
