"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuBookCopy, LuHouse, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/components/layout/Loader";
import { DashboardProvider, useDashboardData } from "@/contexts/DashboardContext";
import { FaPlus } from "react-icons/fa6";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { loading, companies, user } = useDashboardData();
  const [active, setActive] = React.useState<"dashboard" | "bookings" | "settings">("dashboard");
  const [companyIndicatorTop, setCompanyIndicatorTop] = React.useState(0);
  const pathname = usePathname();

  React.useEffect(() => {
    // Derive the active state based on the current pathname
    if (pathname.includes("/dashboard/bookings")) {
      setActive("bookings");
    } else if (pathname.includes("/dashboard/settings")) {
      setActive("settings");
    } else {
      setActive("dashboard");
    }

    // Calculate company indicator position
    if (pathname.includes("/dashboard/browse") && companies !== undefined) {
      const subscribedCount = companies.getCompanies.filter(
        (company) => user?.subscribedCompanies?.includes(Number(company.id)) ?? false
      ).length;
      setCompanyIndicatorTop(subscribedCount === 0 ? 144 : subscribedCount * 72 + 144);
    } else {
      const companyIndex = companies?.getCompanies.findIndex((company) => pathname.includes(company.id)) ?? 0;
      setCompanyIndicatorTop(companyIndex === -1 ? 40 : 144 + 72 * companyIndex);
    }
  }, [pathname, companies, user?.subscribedCompanies]);

  return (
    <div className="flex w-full flex-col gap-0 pl-0 md:flex-row lg:gap-5 lg:pl-8">
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100svh-64px)] max-h-[calc(100svh-64px)] flex-row">
          <div className="flex h-full w-[80px] flex-col items-center justify-start">
            <div
              className="bg-subtle absolute mt-10 flex h-16 w-[80px] items-center justify-start rounded-l-md shadow-lg"
              style={{ marginTop: companyIndicatorTop }}>
              <div className="bg-primary ml-[8px] h-1/2 w-px" />
            </div>
            <div className="mt-12 size-12 rounded-md">
              <Link href="/dashboard">
                <Image width={48} height={48} src="/landingLogo.png" alt="logo" />
              </Link>
            </div>
            <div className="mt-14 flex flex-col gap-y-6">
              {companies?.getCompanies
                ?.filter((company) => user?.subscribedCompanies?.includes(Number(company.id)) ?? false)
                .map((company) => (
                  <Link key={company.id} className="size-12" href={`/dashboard/company/${company.id}`}>
                    <div
                      title={company.name}
                      className="bg-secondary flex size-12 items-center justify-center rounded-lg">
                      {company.name.slice(0, 2)}
                    </div>
                  </Link>
                ))}
              <Link href="/dashboard/browse" className="size-12">
                <div className="border-secondary flex size-12 items-center justify-center rounded-lg border-2">
                  <FaPlus />
                </div>
              </Link>
            </div>
          </div>
          <div className="border-primary flex h-full w-[230px] flex-col items-center justify-start rounded-[20px] border-2">
            <h1 className="mt-8 text-xl font-bold">MeetMate</h1>
            <div className="mt-[35%] flex flex-col items-center justify-start gap-y-4">
              <header className="text-muted-foreground relative left-[-40%] mb-[-6px] text-xs">Tools</header>
              <Link href="/dashboard">
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "dashboard" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "dashboard" ? "default" : "ghost"}>
                  {!pathname.includes("/dashboard/company") && !pathname.includes("/dashboard/browse") ? (
                    <LuLayoutDashboard className="mx-2" size={18} />
                  ) : (
                    <LuHouse className="mx-2" />
                  )}
                  {pathname.includes("/dashboard/company") || pathname.includes("/dashboard/browse")
                    ? "Home"
                    : "Dashboard"}
                </Button>
              </Link>
              {companies?.getCompanies.some((company) => pathname.includes(company.id)) === false &&
                !pathname.includes("/dashboard/browse") && (
                  <Link href="/dashboard/bookings">
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
              <Link href="/dashboard/settings">
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
            </div>
          </div>
        </div>
      </aside>
      <main className="lg:border-border flex w-full flex-col items-center justify-between rounded-none border-0 lg:mt-8 lg:mr-8 lg:min-h-svh lg:rounded-[20px] lg:border-2">
        <div className="min-h-[calc(100svh-64px)] w-full">
          {loading ? <Loader /> : <Suspense fallback={<Loader />}>{children}</Suspense>}
        </div>
        <footer className="bg-primary flex h-8 w-full items-center justify-start rounded-none lg:rounded-b-[20px]">
          <p className="text-background pl-4 text-sm font-medium">MeetMate</p>
        </footer>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardProvider>
  );
}
