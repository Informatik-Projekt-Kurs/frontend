import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { SmoothScrollProvider } from "@/contexts/SmoothScroll.context";

export default function Home() {
  return (
    <>
      <SmoothScrollProvider options={{ smooth: true }}>
        <main
          className={`flex justify-start items-center bg-base-300 min-h-screen flex-col overflow-x-clip w-full relative`}>
          <Navbar />
          <Hero />
          {/* Gallery */}
          <section className="home_aspects px-8 max-w-screen-xl">
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
                <Link
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
                    Webflow platform. Search engine optimisation and cutting-edge user experience design come as
                    standard, along with exceptional reliability, scalability and performance. Plus, friendly support —
                    whenever you need us.
                    <br />‍
                  </p>
                  <div className="home_aspects_card_image">
                    <Image
                      src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65425ac34ea05fb8d97509ce_Group%20614%20copy.webp"
                      loading="lazy"
                      width={640.5}
                      height={100}
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
                </Link>
                <Link
                  href="/services/graphic-design"
                  className="home_aspects_card w-inline-block"
                  style={{
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)",
                    transformStyle: "preserve-3d",
                    opacity: 1
                  }}>
                  <div className="home_aspects_card_image">
                    <Image
                      src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65425ab23e6624e67dd25f6d_Group%20658%20copy.webp"
                      loading="lazy"
                      width={640.5}
                      height={100}
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
                    Whether you’re building a brand from scratch, or developing new assets for your next campaign, we
                    have a wealth of experience in logo design, brand identity development, and social media presence,
                    along with signage, packaging and print design. We’ll support you through the whole journey, from
                    concept to deliverable.
                  </p>
                </Link>
                <Link
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
                      Finding an off-the-shelf app that fits your business model can be tricky. At Phunk we create
                      custom systems to meet specific needs — from customer portals to dashboards, quoting tools, mobile
                      apps, SaaS solutions and more. We have specific experience in HTML, CSS, REACT, NextJS, Laravel,
                      JQuery, Bootstrap, PHP, and MySQL.
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
                </Link>
              </div>
            </div>
            <div className="background-blur is-green is-top-left" />
            <div className="background-blur is-bottom-left" />
          </section>

          <Features />
          <Experience />
          <section className="max-w-screen-xl h-screen">
            <h1 className="text-5xl">End of page</h1>
          </section>
        </main>
      </SmoothScrollProvider>
    </>
  );
}
