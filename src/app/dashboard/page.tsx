import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { LuLayoutDashboard, LuBookCopy, LuSettings, LuCreditCard, LuGauge, LuUser2, LuBuilding } from "react-icons/lu";

function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-5 pl-8 md:flex-row">
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-64px)] flex-row">
          <div className="flex h-full w-[80px] flex-col items-center justify-start">
            <div className="absolute mt-10 flex h-16 w-[80px] items-center justify-start rounded-l-md bg-subtle shadow-lg">
              <div className="ml-[8px] h-[50%] w-[1px] bg-primary"></div>
            </div>
            <div className="mt-12 size-12 rounded-md">
              <Image width={48} height={48} src="/landingLogo.png" alt="logo" />
            </div>
            <div className="mt-14 flex flex-col gap-y-6">
              <div className="size-12 rounded-md bg-secondary"></div>
              <div className="size-12 rounded-md bg-secondary"></div>
              <div className="size-12 rounded-md bg-secondary"></div>
              <div className="size-12 rounded-md bg-secondary"></div>
            </div>
          </div>
          <div className="flex h-full w-[230px] flex-col items-center justify-start rounded-[20px] border-2 border-primary">
            <h1 className="mt-8 text-xl font-bold">MeetMate</h1>
            <div className="mt-[35%] flex flex-col items-center justify-start gap-y-4">
              <header className="relative left-[-40%] mb-[-6px] text-xs text-muted-foreground">Tools</header>
              <Button className="w-[168px] justify-start text-foreground" variant="default">
                <LuLayoutDashboard className="mx-2" size={18} />
                Dashboard
              </Button>
              <Button className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                <LuBookCopy className="mx-2" size={18} />
                Bookings
              </Button>
              <Button className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                <LuCreditCard className="mx-2" size={18} />
                Payouts
              </Button>
              <Button className="w-[168px] justify-start text-muted-foreground" variant="ghost">
                <LuSettings className="mx-2" size={18} />
                Settings
              </Button>

              {/* Only Display this for Admin Users */}
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
            </div>
          </div>
        </div>
      </aside>
      <main className="mr-8 mt-8 min-h-screen w-full rounded-[20px] border-2 border-border md:w-2/3 lg:w-3/4">
        <div className="p-4">
          <h1 className="m-4 font-medium text-muted-foreground md:text-2xl">Welcome back, Tim</h1>

          <div className="h-[250vh]"></div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
