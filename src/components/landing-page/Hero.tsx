"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Hero() {
  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-clip bg-background">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="landingGradient relative"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" introducingMeetMate mt-[-36rem]">
          <div className="bg-background">Introducing MeetMate</div>
        </motion.div>
        <motion.h1
          className="landingHeading text-center text-5xl font-semibold max-sm:text-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Your brand, <br className="hidden max-sm:block" /> built <span>better</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[600px] text-center text-base font-light leading-6 text-foreground max-md:max-w-[80vw]">
          Crafting Your Brands Story into Unforgettable Web, Graphic, and Video Masterpieces that Captivate and Convert.
        </motion.p>
        <Button className="rounded-full px-6 text-foreground" size={"lg"}>
          Launch a project
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="home_hero_graphic-wrapper pointer-events-none absolute inset-x-0 bottom-16 top-auto w-full overflow-visible px-10 text-center">
        <motion.img
          variants={pulseVariants}
          animate="animate"
          src={"/landingLogoNoBg.png"}
          loading="lazy"
          className="graphic_brand-logo absolute inset-x-0 bottom-5 top-auto mx-auto inline-block size-[4.75rem] max-w-full"
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
            className="home_hero_stars relative z-[5] inline-block w-auto"
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
