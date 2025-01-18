import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Menu, Settings, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn, extractNameInitials } from "@/lib/utils";
import { LuBookCopy, LuLayoutDashboard } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useCompany } from "@/contexts/CompanyContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function HamburgerMenu() {
  const { company } = useCompany();
  const [active, setActive] = useState<"dashboard" | "bookings" | "users" | "members" | "settings">("dashboard");
  const pathname = usePathname();

  useEffect(() => {
    // Derive the active state based on the current pathname
    if (pathname.includes("/company/dashboard/bookings")) {
      setActive("bookings");
    } else if (pathname.includes("/company/dashboard/users")) {
      setActive("users");
    } else if (pathname.includes("/company/dashboard/members")) {
      setActive("members");
    } else if (pathname.includes("/company/dashboard/settings")) {
      setActive("settings");
    } else {
      setActive("dashboard");
    }
  }, [pathname]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className={"block lg:hidden"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"text-foreground"}>
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
              <Link href={"/company/dashboard/settings"}>
                <Button
                  className={cn(
                    "w-[168px] justify-start",
                    active === "settings" ? "text-foreground" : "text-muted-foreground"
                  )}
                  variant={active === "settings" ? "default" : "ghost"}>
                  <Settings className="mx-2" size={18} />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
