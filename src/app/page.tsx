import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex justify-start items-center bg-base-300 min-h-screen flex-col">
        <nav className="flex justify-between items-center max-w-screen-xl w-full mt-8 px-8">
          <div className="flex justify-center items-center ">
            <Image src="/landingLogo.png" alt="MeetMate" width={40} height={0}></Image>
            <h2 className="text-2xl font-bold ml-2">MeetMate</h2>
          </div>

          <li className="list-none flex justify-between items-center gap-6 border-[1px] px-6 py-3 rounded-full border-gray-500 ml-[-4vw] navList max-lg:hidden">
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

          <button className="btn btn-primary rounded-full px-8 max-lg:hidden">
            <Link href="#">Talk To Us</Link>
          </button>
          <button className="hidden max-lg:block btn btn-outline btn-primary rounded-full px-6">Menu</button>
        </nav>
        <div className="flex justify-center items-center flex-col gap-6">
          <div className="landingGradient relative"></div>
          <div className=" introducingMeetMate mt-[-36rem]">
            <div className="bg-base-300">Introducing MeetMate</div>
          </div>
          <h1 className="text-5xl font-semibold landingHeading">
            Your brand, built <span>better</span>
          </h1>
          <p className="text-primary-content max-w-[600px] text-center text-base font-light leading-6">
            We transform your brand vision into tangible web, graphic and video experiences that stop prospective
            clients in their tracks.
          </p>
          <button className="btn btn-primary rounded-full px-6">Launch a project</button>
        </div>

        <div className="home_hero_graphic-wrapper pointer-events-none w-full pb-12 px-10 absolute top-auto bottom-0 left-0 right-0 text-center">
          <Image
            src={"/landingLogoNoBg.png"}
            loading="lazy"
            className="graphic_brand-logo w-[4.75rem] h-[4.75rem] mx-auto absolute top-auto bottom-5 left-0 right-0 max-w-full inline-block"
            alt={""}
            width={100}
            height={100}></Image>
          <div className="home_hero_graphic">
            <img
              src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/650347cc5ff83f6f05a40af2_Group%2060.svg"
              loading="lazy"
              alt=""
              className="home_hero_stars z-[5] relative max-w-full inline-block"
            />
            <div className="home_hero_circles">
              <div className="graphic_circle_large" />
              <div className="graphic_circle_medium" />
              <div className="graphic_circle_small" />
              <div className="graphic_circle_tiny" />
            </div>
            <img
              src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65363b2d9ea7b7c5f9c07406_Grid.svg"
              loading="lazy"
              alt=""
              className="home_hero_pattern is-left"
            />
            <img
              src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65363b2d9ea7b7c5f9c07406_Grid.svg"
              loading="lazy"
              alt=""
              className="home_hero_pattern"
            />
            <div className="home_hero_gradient" />
          </div>
        </div>
      </main>
    </>
  );
}
