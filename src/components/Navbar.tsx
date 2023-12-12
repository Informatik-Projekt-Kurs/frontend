"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function Navbar() {
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
    <nav className="flex justify-center items-center sticky top-0 left-0 z-10  w-full px-8 nav ">
      <div className="flex justify-between items-center sticky top-0 left-0 z-10 max-w-screen-xl w-full px-8 backdrop-blur-[1px]">
        <div className="flex justify-center items-center mt-8 navLeft">
          <Image src="/landingLogo.png" alt="MeetMate" width={40} height={0}></Image>
          <h2 className="text-2xl font-bold ml-2">MeetMate</h2>
        </div>

        <li className="list-none flex justify-between items-center gap-6 border-[1px] px-6 py-3 rounded-full border-gray-500 ml-[-2vw] max-lg:hidden mt-8">
          <Link className="hover:text-white hover:font-semibold navLink" href="/">
            Home
          </Link>
          <Link className=" hover:text-white hover:font-semibold navLink" href="about">
            About Us
          </Link>
          <Link className=" hover:text-white hover:font-semibold navLink" href="services">
            Services
          </Link>
          <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Not available yet">
            <Link className="navLink opacity-80 cursor-default" href="#">
              Pricing
            </Link>
          </div>
          <Link className=" hover:text-white hover:font-semibold navLink" href="account">
            Account
          </Link>
        </li>

        <button className="btn btn-primary rounded-full px-8 max-lg:hidden mt-8 navRight">
          <Link href="#">Talk To Us</Link>
        </button>
        <button className="hidden max-lg:block btn btn-outline btn-primary rounded-full px-6 mt-8">Menu</button>
      </div>
    </nav>
  );
}

export default Navbar;
