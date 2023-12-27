"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

function LandingNavbar() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const navLeft = document.querySelector(".navLeft");
      const navRight = document.querySelector(".navRight");
      navLeft?.classList.toggle("navScroll", window.pageYOffset > 0);
      navRight?.classList.toggle("navScroll", window.pageYOffset > 0);
    });
    return () => {};
  }, []);

  return (
    <nav className="flex justify-center items-center sticky top-0 left-0 z-10  w-full px-8 nav max-sm:px-0 ">
      <div className="flex justify-between items-center sticky top-0 left-0 z-10 max-w-screen-xl w-full px-8 backdrop-blur-[1px]">
        <div className="flex justify-center items-center mt-8 navLeft">
          <Image src="/landingLogo.png" alt="MeetMate" width={40} height={0}></Image>
          <h2 className="text-2xl font-bold ml-2 text-foreground">MeetMate</h2>
        </div>

        <li className="list-none flex justify-between items-center border-[1px] pl-6 h-12 rounded-full border-primary ml-[-2vw] max-lg:hidden mt-8">
          <div className="flex justify-between items-ceter gap-6 text-foreground">
            <Link className="hover:text-white hover:font-semibold navLink" href="/">
              Home
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="about">
              About Us
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="services">
              Services
            </Link>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="navLink opacity-80 cursor-default" href="#">
                    Pricing
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="rounded-full border-border">
                  <p>Not available yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Link
            className="bg-primary text-lg  rounded-full w-12 h-12 flex justify-center items-center ml-6 text-foreground hover:text-white"
            href="account">
            <div className="hover:scale-110 transition-transform">
              <FaUser />
            </div>
          </Link>
        </li>

        <Button size={"lg"} className="rounded-full px-8 max-lg:hidden mt-8 navRight text-foreground">
          <Link href="#">Talk To Us</Link>
        </Button>
        <Button className="hidden max-lg:block rounded-full px-6 mt-8" variant={"secondary"}>
          Menu
        </Button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
