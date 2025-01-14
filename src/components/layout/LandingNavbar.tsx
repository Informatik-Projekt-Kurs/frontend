"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function LandingNavbar() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const navLeft = document.querySelector(".navLeft");
      const navRight = document.querySelector(".navRight");
      navLeft?.classList.toggle("navScroll", window.pageYOffset > 0);
      navRight?.classList.toggle("navScroll", window.pageYOffset > 0);
    });
  }, []);

  return (
    <nav className="nav sticky left-0 top-0 z-10 flex w-full  items-center justify-center px-8 max-sm:px-0 ">
      <div className="sticky left-0 top-0 z-10 flex w-full max-w-screen-xl items-center justify-between px-8 backdrop-blur-[1px]">
        <div className="navLeft mt-8 flex items-center justify-center">
          <Image src="/landingLogo.png" alt="MeetMate" width={40} height={0}></Image>
          <h2 className="ml-2 text-2xl font-bold text-foreground">MeetMate</h2>
        </div>

        <li className="ml-[-8vw] mt-8 flex h-12 list-none items-center justify-between rounded-full border-DEFAULT border-primary pl-6 max-lg:hidden">
          <div className="items-ceter flex justify-between gap-6 text-foreground">
            <Link className="navLink hover:font-semibold hover:text-white" href="/">
              Home
            </Link>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="navLink cursor-default opacity-80" href="#">
                    About Us
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="rounded-full border-border">
                  <p>Not available yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="navLink cursor-default opacity-80" href="#">
                    Services
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="rounded-full border-border">
                  <p>Not available yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="navLink cursor-default opacity-80" href="#">
                    Pricing
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="rounded-full border-border">
                  <p>Not available yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </li>

        <Link
          className="navRight ml-6 mt-8 flex size-12 items-center justify-center rounded-full bg-primary text-lg text-foreground hover:text-white"
          href={"dashboard"}>
          <div className="transition-transform hover:scale-110">
            <FaUser />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;
