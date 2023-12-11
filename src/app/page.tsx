import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex justify-start items-center bg-base-300 min-h-screen flex-col">
        <nav className="flex justify-between items-center max-w-screen-xl w-full mt-8 px-8">
          <div className="flex justify-center items-center ">
            <Image src="/landingLogo.png" alt="MeetMate" width={50} height={0}></Image>
            <h2 className="text-2xl font-bold ml-2">MeetMate</h2>
          </div>

          <li className="list-none flex justify-between items-center gap-6 border-[1px] px-6 py-3 rounded-full border-gray-500 ml-[-3vw] navList">
            <Link className="hover:text-white hover:font-semibold navLink" href="/">
              Home
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="about">
              About Us
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="about">
              Services
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="about">
              Portfolio
            </Link>
            <Link className=" hover:text-white hover:font-semibold navLink" href="about">
              News
            </Link>
          </li>

          <button className="btn btn-primary rounded-full px-8 ">
            <Link href="#">Talk To Us</Link>
          </button>
        </nav>
        <div className="flex justify-center items-center flex-col mt-16 gap-6">
          <div className="landingGradient relative"></div>
          <div className=" introducingMeetMate mt-[-30rem]">
            <div className="bg-base-300">Introducing MeetMate</div>
          </div>
          <h1 className="text-5xl font-semibold landingHeading">
            Your brand, built <span>better</span>
          </h1>
          <p className="text-primary-content max-w-[600px] text-center text-base font-light leading-6">
            We transform your brand vision into tangible web, graphic and video experiences that stop prospective
            clients in their tracks.
          </p>
          <button className="btn btn-primary rounded-full">Launch a project</button>
        </div>
      </main>
    </>
  );
}
