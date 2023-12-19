"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function Hero() {
  const pulseVariants = {
    animate: {
      scale: [1, 1.03],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return (
    <div className="flex justify-start items-center bg-base-300 min-h-screen flex-col overflow-x-clip w-full relative">
      <div className="flex justify-center items-center flex-col gap-6">
        <div className="landingGradient relative"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" introducingMeetMate mt-[-36rem]">
          <div className="bg-base-300">Introducing MeetMate</div>
        </motion.div>
        <motion.h1
          className="text-5xl font-semibold landingHeading text-center max-sm:text-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Your brand, <br className="max-sm:block hidden" /> built <span>better</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-primary-content max-w-[600px] text-center text-base font-light leading-6 max-md:max-w-[80vw]">
          Crafting Your Brands Story into Unforgettable Web, Graphic, and Video Masterpieces that Captivate and Convert.
        </motion.p>
        <button className="btn btn-primary rounded-full px-6">Launch a project</button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="home_hero_graphic-wrapper pointer-events-none w-full px-10 absolute top-auto bottom-16 left-0 right-0 text-center overflow-visible">
        <motion.img
          variants={pulseVariants}
          animate="animate"
          src={"/landingLogoNoBg.png"}
          loading="lazy"
          className="graphic_brand-logo w-[4.75rem] h-[4.75rem] mx-auto absolute top-auto bottom-5 left-0 right-0 max-w-full inline-block"
          alt={""}
          width={100}
          height={100}></motion.img>
        <div className="home_hero_graphic relative bottom-12">
          <Image
            src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/650347cc5ff83f6f05a40af2_Group%2060.svg"
            loading="lazy"
            width={100}
            height={100}
            alt=""
            className="home_hero_stars z-[5] relative w-auto inline-block"
          />
          <div className="home_hero_circles">
            <div className="graphic_circle_large" />
            <div className="graphic_circle_medium" />
            <div className="graphic_circle_small" />
            <div className="graphic_circle_tiny" />
          </div>
          <Image
            src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65363b2d9ea7b7c5f9c07406_Grid.svg"
            loading="lazy"
            width={100}
            height={100}
            alt=""
            className="home_hero_pattern is-left"
          />
          <Image
            src="https://assets-global.website-files.com/6501f1891917bde75ab542ee/65363b2d9ea7b7c5f9c07406_Grid.svg"
            loading="lazy"
            width={100}
            height={100}
            alt=""
            className="home_hero_pattern"
          />
          <div className="home_hero_gradient" />
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
