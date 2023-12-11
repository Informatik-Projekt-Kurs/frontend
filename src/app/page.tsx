import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex justify-start items-center bg-base-300 min-h-screen flex-col">
        <nav className="flex justify-center items-center sticky top-0 left-0 z-10  w-full px-8">
          <div className="flex justify-between items-center sticky top-0 left-0 z-10 max-w-screen-xl w-full px-8 backdrop-blur-[1px]">
            <div className="flex justify-center items-center mt-8">
              <Image src="/landingLogo.png" alt="MeetMate" width={40} height={0}></Image>
              <h2 className="text-2xl font-bold ml-2">MeetMate</h2>
            </div>

            <li className="list-none flex justify-between items-center gap-6 border-[1px] px-6 py-3 rounded-full border-gray-500 ml-[-4vw] max-lg:hidden mt-8">
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

            <button className="btn btn-primary rounded-full px-8 max-lg:hidden mt-8">
              <Link href="#">Talk To Us</Link>
            </button>
            <button className="hidden max-lg:block btn btn-outline btn-primary rounded-full px-6 mt-8">Menu</button>
          </div>
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

        {/* Gallery */}
        <section className="home_aspects mt-[50vh] px-8 max-w-screen-xl">
          <div className="container-medium">
            <div className="home_aspects_heading">
              <h2
                style={{
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1
                }}
                className="heading_standard text-3xl font-semibold">
                <span className="span_gradient">Laser-focused</span> on 3 key aspects of design.
              </h2>
            </div>
            <div className="home_aspects_grid">
              <a
                href="/services/web-design"
                className="home_aspects_card w-inline-block"
                style={{
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1
                }}>
                <div className="home_aspects_card_number">01</div>
                <h3 className="home_aspects_card_heading">
                  <span className="span_gradient">Web Design</span>
                </h3>
                <p className="text-color-grey">
                  We create stunning, engaging and high-conversion websites based on the versatile and future-proof
                  Webflow platform. Search engine optimisation and cutting-edge user experience design come as standard,
                  along with exceptional reliability, scalability and performance. Plus, friendly support — whenever you
                  need us.
                  <br />‍
                </p>
                <div className="home_aspects_card_image">
                  <img
                    src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65425ac34ea05fb8d97509ce_Group%20614%20copy.webp"
                    loading="lazy"
                    width="640.5"
                    alt=""
                    className="image_cover"
                  />
                  <div className="home_aspects_card_arrow-icon w-embed">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.5" cy="12.5" r="12.5" fill="currentColor" />
                      <path
                        d="M16.9998 12.9999C16.9998 12.7848 16.9158 12.5696 16.7481 12.4058L11.4679 7.24619C11.132 6.91794 10.5874 6.91794 10.2517 7.24619C9.91609 7.57417 9.91609 8.10638 10.2517 8.43464L14.9237 13.0001L10.2517 17.5654C9.91609 17.8936 9.91609 18.4256 10.2517 18.7535C10.5874 19.0818 11.132 19.0818 11.4679 18.7535L16.7481 13.594C16.9158 13.4298 16.9998 13.215 16.9998 12.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
              </a>
              <a
                href="/services/graphic-design"
                className="home_aspects_card w-inline-block"
                style={{
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1
                }}>
                <div className="home_aspects_card_image">
                  <img
                    src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65425ab23e6624e67dd25f6d_Group%20658%20copy.webp"
                    loading="lazy"
                    width="640.5"
                    alt=""
                    className="image_cover"
                  />
                  <div className="home_aspects_card_arrow-icon w-embed">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.5" cy="12.5" r="12.5" fill="currentColor" />
                      <path
                        d="M16.9998 12.9999C16.9998 12.7848 16.9158 12.5696 16.7481 12.4058L11.4679 7.24619C11.132 6.91794 10.5874 6.91794 10.2517 7.24619C9.91609 7.57417 9.91609 8.10638 10.2517 8.43464L14.9237 13.0001L10.2517 17.5654C9.91609 17.8936 9.91609 18.4256 10.2517 18.7535C10.5874 19.0818 11.132 19.0818 11.4679 18.7535L16.7481 13.594C16.9158 13.4298 16.9998 13.215 16.9998 12.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                <div className="home_aspects_card_number">02</div>
                <h3 className="home_aspects_card_heading">
                  <span className="span_gradient">Graphic Design</span>
                </h3>
                <p className="text-color-grey">
                  Whether you’re building a brand from scratch, or developing new assets for your next campaign, we have
                  a wealth of experience in logo design, brand identity development, and social media presence, along
                  with signage, packaging and print design. We’ll support you through the whole journey, from concept to
                  deliverable.
                </p>
              </a>
              <a
                href="/services/software-development"
                className="home_aspects_card is-grid max-w-full flex flex-col"
                style={{
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)",
                  transformStyle: "preserve-3d",
                  opacity: 1,
                  gridArea: "span 1/span 2/span 1/span 2"
                }}>
                <div className="home_aspects_card_content">
                  <div className="home_aspects_card_number">03</div>
                  <h3 className="home_aspects_card_heading">
                    <span className="span_gradient">
                      Custom System <br />
                    </span>
                    <span className="span_gradient">Development</span>
                  </h3>
                  <p className="text-color-grey">
                    Finding an off-the-shelf app that fits your business model can be tricky. At Phunk we create custom
                    systems to meet specific needs — from customer portals to dashboards, quoting tools, mobile apps,
                    SaaS solutions and more. We have specific experience in HTML, CSS, REACT, NextJS, Laravel, JQuery,
                    Bootstrap, PHP, and MySQL.
                  </p>
                </div>
                <div className="home_aspects_card_image is-large">
                  <img
                    src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65425d03ac2dd88a7a91bbc6_Group%20656%20copy.webp"
                    loading="lazy"
                    width={854}
                    alt=""
                    className="image_cover"
                  />
                  <div className="home_aspects_card_arrow-icon w-embed">
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.5" cy="12.5" r="12.5" fill="currentColor" />
                      <path
                        d="M16.9998 12.9999C16.9998 12.7848 16.9158 12.5696 16.7481 12.4058L11.4679 7.24619C11.132 6.91794 10.5874 6.91794 10.2517 7.24619C9.91609 7.57417 9.91609 8.10638 10.2517 8.43464L14.9237 13.0001L10.2517 17.5654C9.91609 17.8936 9.91609 18.4256 10.2517 18.7535C10.5874 19.0818 11.132 19.0818 11.4679 18.7535L16.7481 13.594C16.9158 13.4298 16.9998 13.215 16.9998 12.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="background-blur is-green is-top-left" />
          <div className="background-blur is-bottom-left" />
        </section>
      </main>
    </>
  );
}
