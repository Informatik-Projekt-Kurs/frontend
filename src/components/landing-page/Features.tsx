"use client";
import { stylesWithCssVar } from "@/lib/motion";
import { useScroll, useTransform, motion } from "framer-motion";
import React from "react";
import Scene from "./3d/Scene";

export const Features = () => {
  const targetRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);

  const text1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.3, 0.4, 0.5], ["30px", "0px", "-30px"]);

  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7], ["30px", "0px", "-30px"]);

  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], ["30px", "0px", "-30px"]);

  return (
    <section ref={targetRef} className="flex h-[300vh] flex-col items-center justify-start">
      <div className="sticky left-0 top-[16.7vh] h-[66.8vh] px-16 text-2xl text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
        <motion.div style={{ x }} className="size-screen relative">
          <Scene />
        </motion.div>
        <motion.p
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={stylesWithCssVar({
            opacity: text1Opacity,
            "--y": text1Y
          })}
          className="translate-y-centered-offset max-sm:px:14 absolute left-[10%] top-1/2 text-2xl font-medium max-md:px-20 sm:left-[10%] md:left-[10%] lg:left-1/3 lg:max-w-screen-xl 2xl:left-2/4">
          <span
            className="text-3xl font-bold text-primary"
            style={{
              textShadow: "3px 2px 2px darkslategray"
            }}>
            Preconfigured environments
          </span>
          <br />
          We detect your environment so you don&apos;t need to fiddle with configuration files.
        </motion.p>
        <motion.p
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text2Y
          })}
          className="translate-y-centered-offset max-sm:px:14 absolute left-[10%] top-1/2 text-2xl font-medium max-md:px-20 sm:left-[10%] md:left-[10%] lg:left-1/3 lg:max-w-screen-xl 2xl:left-2/4">
          <span
            className="text-3xl font-bold text-primary"
            style={{
              textShadow: "3px 2px 2px darkslategray"
            }}>
            Command Pallete
          </span>
          <br />
          Access and complete any action in seconds with the command palette.
        </motion.p>
        <motion.p
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={stylesWithCssVar({
            opacity: text3Opacity,
            "--y": text3Y
          })}
          className="translate-y-centered-offset max-sm:px:14 absolute left-[10%] top-1/2 text-2xl font-medium max-md:px-20 sm:left-[10%] md:left-[10%] lg:left-1/3 lg:max-w-screen-xl 2xl:left-2/4">
          <span
            className="text-3xl font-bold text-primary"
            style={{
              textShadow: "3px 2px 2px darkslategray"
            }}>
            Devtools
          </span>
          <br />
          We&apos;ve bundled useful tools to help you get your work done faster and more efficiently.
        </motion.p>
      </div>
    </section>
  );
};
