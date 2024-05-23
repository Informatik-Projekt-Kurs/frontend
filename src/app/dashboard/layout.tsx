"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuBookCopy, LuBuilding, LuGauge, LuLayoutDashboard, LuSettings, LuUser2, LuHome } from "react-icons/lu";
import React, { Suspense, useEffect, useState } from "react";
import type { User } from "@/types";
import { getAccessToken, getUser } from "@/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/components/layout/Loader";
import { DashboardProvider } from "@/components/dashboard/DashboardContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();
  const [isAdmin, setIsAdmin] = useState(user?.role === "ADMIN");
  const [active, setActive] = useState<"dashboard" | "bookings" | "settings">("dashboard");
  const [companyIndicatorTop, setCompanyIndicatorTop] = useState(0);

  const companies = [
    { id: "29103", name: "Company 1" },
    { id: "61241", name: "Company 2" },
    { id: "1241", name: "Company 3" }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        setUser(await getUser(accessToken));
        setIsAdmin(user?.role === "ADMIN");
      } catch (error) {
        setIsAdmin(false);
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser().catch(console.error);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    // Derive the active state based on the current pathname
    if (pathname.includes("/dashboard/bookings")) {
      setActive("bookings");
    } else if (pathname.includes("/dashboard/settings")) {
      setActive("settings");
    } else {
      setActive("dashboard");
    }

    // Derive the top position of the company indicator
    const companyIndex = companies.findIndex((company) => pathname.includes(company.id));
    setCompanyIndicatorTop(companyIndex === -1 ? 40 : 144 + 72 * companyIndex);
  }, [pathname]);

  return (
    <div className="flex w-full flex-col gap-5 pl-8 md:flex-row">
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-64px)] flex-row">
          <div className="flex h-full w-[80px] flex-col items-center justify-start">
            <div
              className="absolute mt-10 flex h-16 w-[80px] items-center justify-start rounded-l-md bg-subtle shadow-lg"
              style={{ marginTop: companyIndicatorTop }}>
              <div className="ml-[8px] h-[50%] w-px bg-primary"></div>
            </div>
            <div className="mt-12 size-12 rounded-md">
              <Link href={"/dashboard"}>
                <Image width={48} height={48} src="/landingLogo.png" alt="logo" />
              </Link>
            </div>
            <div className="mt-14 flex flex-col gap-y-6">
              {companies.map((company) => (
                <Link key={company.id} className={"size-12"} href={`/dashboard/company/${company.id}`}>
                  <div key={company.id} className="size-12 rounded-md bg-secondary"></div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex h-full w-[230px] flex-col items-center justify-start rounded-[20px] border-2 border-primary">
            <h1 className="mt-8 text-xl font-bold">MeetMate</h1>
            <div className="mt-[35%] flex flex-col items-center justify-start gap-y-4">
              <header className="relative left-[-40%] mb-[-6px] text-xs text-muted-foreground">Tools</header>
              <Link href={"/dashboard"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "dashboard" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "dashboard" ? "default" : "ghost"}>
                  {!pathname.includes("/dashboard/company") ? (
                    <LuLayoutDashboard className="mx-2" size={18} />
                  ) : (
                    <LuHome className={"mx-2"} />
                  )}
                  {pathname.includes("/dashboard/company") ? "Home" : "Dashboard"}
                </Button>
              </Link>
              {!companies.some((company) => pathname.includes(company.id)) && (
                <Link href={"/dashboard/bookings"}>
                  <Button
                    className={cn(
                      "w-[168px] justify-start",
                      active === "bookings" ? "text-foreground" : "text-muted-foreground"
                    )}
                    variant={active === "bookings" ? "default" : "ghost"}>
                    <LuBookCopy className="mx-2" size={18} />
                    Bookings
                  </Button>
                </Link>
              )}
              <Link href={"/dashboard/settings"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "settings" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "settings" ? "default" : "ghost"}>
                  <LuSettings className="mx-2" size={18} />
                  Settings
                </Button>
              </Link>

              {isAdmin && (
                <React.Fragment>
                  <header className="relative left-[-40%] mb-[-6px] mt-6 text-xs text-muted-foreground">Admin</header>
                  <Button className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                    <LuBuilding className="mx-2" size={18} />
                    Companies
                  </Button>
                  <Button className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                    <LuUser2 className="mx-2" size={18} />
                    Users
                  </Button>
                  <Button disabled className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                    <LuGauge className="mx-2" size={18} />
                    Analytics
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </aside>
      <main className="mr-8 mt-8 min-h-[calc(100vh-64px)] w-full rounded-[20px] border-2 border-border">
        {loading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <DashboardProvider user={user!}>{children}</DashboardProvider>
          </Suspense>
        )}
        <footer className="flex h-8 w-full items-center justify-start rounded-b-[20px] bg-primary">
          <p className="pl-4 text-sm font-medium text-background">MeetMate</p>
        </footer>
      </main>
    </div>
  );
}
