"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuBookCopy, LuHome, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/components/layout/Loader";
import { DashboardProvider, useDashboardData } from "@/components/dashboard/DashboardContext";
import { FaPlus } from "react-icons/fa6";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { loading, companies, companiesLoading, user } = useDashboardData();
  const [active, setActive] = useState<"dashboard" | "bookings" | "settings">("dashboard");
  const [companyIndicatorTop, setCompanyIndicatorTop] = useState(0);
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

    if (pathname.includes("/dashboard/browse") && companies !== undefined) {
      if (
        companies?.getCompanies.filter((company) => user?.subscribedCompanies.includes(Number(company.id))).length === 0
      ) {
        setCompanyIndicatorTop(144);
      } else setCompanyIndicatorTop(companies?.getCompanies.length * 72 + 144);
    } else {
      // Derive the top position of the company indicator
      const companyIndex = companies?.getCompanies.findIndex((company) => pathname.includes(company.id)) ?? 0;
      setCompanyIndicatorTop(companyIndex === -1 ? 40 : 144 + 72 * companyIndex);
    }
  }, [pathname, companies]);

  return (
    <div className="flex w-full flex-col gap-5 pl-8 md:flex-row">
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-64px)] flex-row">
          <div className="flex h-full w-[80px] flex-col items-center justify-start">
            <div
              className="absolute mt-10 flex h-16 w-[80px] items-center justify-start rounded-l-md bg-subtle shadow-lg"
              style={{ marginTop: companyIndicatorTop }}>
              <div className="ml-[8px] h-1/2 w-px bg-primary"></div>
            </div>
            <div className="mt-12 size-12 rounded-md">
              <Link href={"/dashboard"}>
                <Image width={48} height={48} src="/landingLogo.png" alt="logo" />
              </Link>
            </div>
            <div className="mt-14 flex flex-col gap-y-6">
              {companies?.getCompanies
                ?.filter((company) => user?.subscribedCompanies.includes(Number(company.id)))
                .map((company) => (
                  <Link key={company.id} className={"size-12"} href={`/dashboard/company/${company.id}`}>
                    <div
                      title={company.name}
                      key={company.id}
                      className="flex size-12 items-center justify-center rounded-lg bg-secondary">
                      {company.name[0] + company.name[1]}
                    </div>
                  </Link>
                ))}
              <Link href={"/dashboard/browse"} className={"size-12"}>
                <div className={`flex size-12 items-center justify-center rounded-lg border-2 border-secondary`}>
                  <FaPlus />
                </div>
              </Link>
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
                  {!pathname.includes("/dashboard/company") && !pathname.includes("/dashboard/browse") ? (
                    <LuLayoutDashboard className="mx-2" size={18} />
                  ) : (
                    <LuHome className={"mx-2"} />
                  )}
                  {pathname.includes("/dashboard/company") || pathname.includes("/dashboard/browse")
                    ? "Home"
                    : "Dashboard"}
                </Button>
              </Link>
              {companies?.getCompanies.some((company) => pathname.includes(company.id)) === false &&
                !pathname.includes("/dashboard/browse") && (
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

              {/*{isAdmin && (
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
              )} */}
            </div>
          </div>
        </div>
      </aside>
      <main className="mr-8 mt-8 min-h-[calc(100vh-64px)] w-full rounded-[20px] border-2 border-border">
        {loading || companiesLoading ? <Loader /> : <Suspense fallback={<Loader />}>{children}</Suspense>}
        <footer className="flex h-8 w-full items-center justify-start rounded-b-[20px] bg-primary">
          <p className="pl-4 text-sm font-medium text-background">MeetMate</p>
        </footer>
      </main>
    </div>
  );
}

// Wrap the dashboard with the UserProvider
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardProvider>
  );
}
