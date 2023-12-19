"use client";
import { stylesWithCssVar } from "@/utils/motion";
import { useScroll, useTransform, motion } from "framer-motion";
import React from "react";
import { Suspense, useRef } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

export const Features = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6, 0.85, 0.9], [1, 1, 0.4, 0.4, 1]);

  const text1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.3, 0.4, 0.5], ["30px", "0px", "-30px"]);

  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7], ["30px", "0px", "-30px"]);

  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], ["30px", "0px", "-30px"]);

  return (
    <section ref={targetRef} className="flex h-[300vh] flex-col items-center justify-start">
      <div className="sticky top-[16.7vh] h-[66.8vh] px-16 text-2xl text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
        <motion.div style={{ x }} className="relative h-screen w-screen">
          <Spline scene="https://prod.spline.design/TwBXCflNDhiLkDMk/scene.splinecode" />
        </motion.div>
        <motion.p
          style={stylesWithCssVar({
            opacity: text1Opacity,
            "--y": text1Y
          })}
          className="translate-y-centered-offset absolute top-1/2 2xl:left-2/4 lg:left-1/3 md:left-[10%] sm:left-[10%] left-[10%] lg:max-w-screen-xl max-md:px-20 max-sm:px:14 text-2xl font-medium">
          <span
            className="text-primary font-bold text-3xl"
            style={{
              textShadow: "3px 2px 2px oklch(var(--s))"
            }}>
            Preconfigured environments
          </span>
          <br />
          We detect your environment so you don&apos;t need to fiddle with configuration files.
        </motion.p>
        <motion.p
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text2Y
          })}
          className="translate-y-centered-offset absolute top-1/2 2xl:left-2/4 lg:left-1/3 md:left-[10%] sm:left-[10%] left-[10%] lg:max-w-screen-xl max-md:px-20 max-sm:px:14 text-2xl font-medium">
          <span
            className="text-primary font-bold text-3xl"
            style={{
              textShadow: "3px 2px 2px oklch(var(--s))"
            }}>
            Command Pallete
          </span>
          <br />
          Access and complete any action in seconds with the command palette.
        </motion.p>
        <motion.p
          style={stylesWithCssVar({
            opacity: text3Opacity,
            "--y": text3Y
          })}
          className="translate-y-centered-offset absolute top-1/2 2xl:left-2/4 lg:left-1/3 md:left-[10%] sm:left-[10%] left-[10%] lg:max-w-screen-xl max-md:px-20 max-sm:px:14 text-2xl font-medium">
          <span
            className="text-primary font-bold text-3xl"
            style={{
              textShadow: "3px 2px 2px oklch(var(--s))"
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
