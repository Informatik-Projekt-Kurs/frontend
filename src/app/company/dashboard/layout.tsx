"use client";
import { Button } from "@/components/ui/button";
import { LuBookCopy, LuLayoutDashboard } from "react-icons/lu";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, extractNameInitials } from "@/lib/utils";
import Loader from "@/components/layout/Loader";
import { CompanyProvider, useCompany } from "@/components/dashboard/CompanyContext";
import { BriefcaseBusiness, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { companyLoading, loading, company } = useCompany();
  const [active, setActive] = useState<"dashboard" | "bookings" | "users" | "members">("dashboard");
  const pathname = usePathname();

  useEffect(() => {
    // Derive the active state based on the current pathname
    if (pathname.includes("/company/dashboard/bookings")) {
      setActive("bookings");
    } else if (pathname.includes("/company/dashboard/users")) {
      setActive("users");
    } else if (pathname.includes("/company/dashboard/members")) {
      setActive("members");
    } else {
      setActive("dashboard");
    }
  }, [pathname]);

  return (
    <div className="flex w-full flex-col gap-5 pl-8 md:flex-row">
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-64px)] flex-row">
          <div className="flex h-full w-[80px] flex-col items-center justify-start">
            <div
              className="absolute mt-10 flex h-16 w-[80px] items-center justify-start rounded-l-md bg-subtle shadow-lg"
              style={{ marginTop: 40 }}>
              <div className="ml-[8px] h-1/2 w-px bg-primary"></div>
            </div>
            <div className="mt-12 flex size-12 items-center justify-center rounded-md">
              <Link href={"/company/dashboard"}>
                <Avatar className="size-10">
                  <AvatarFallback className={"bg-primary"}>
                    {extractNameInitials(company?.getCompany.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
          <div className="flex h-full w-[230px] flex-col items-center justify-start rounded-[20px] border-2 border-primary">
            <h1 className="mt-8 text-xl font-bold">{company?.getCompany.name}</h1>
            <div className="mt-[35%] flex flex-col items-center justify-start gap-y-4">
              <header className="relative left-[-40%] mb-[-6px] text-xs text-muted-foreground">Tools</header>
              <Link href={"/company/dashboard"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "dashboard" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "dashboard" ? "default" : "ghost"}>
                  <LuLayoutDashboard className="mx-2" size={18} />
                  Dashboard
                </Button>
              </Link>
              <Link href={"/company/dashboard/bookings"}>
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
              <Link href={"/company/dashboard/users"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "users" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "users" ? "default" : "ghost"}>
                  <Users className="mx-2" size={18} />
                  Clients
                </Button>
              </Link>
              <Link href={"/company/dashboard/members"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "members" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "members" ? "default" : "ghost"}>
                  <BriefcaseBusiness className="mx-2" size={18} />
                  Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>
      <main className="mr-8 mt-8 min-h-[calc(100vh-64px)] w-full rounded-[20px] border-2 border-border">
        {loading || companyLoading ? <Loader /> : <Suspense fallback={<Loader />}>{children}</Suspense>}
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
    <CompanyProvider>
      <DashboardContent>{children}</DashboardContent>
    </CompanyProvider>
  );
}
