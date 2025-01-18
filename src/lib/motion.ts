import { type MotionStyle, type MotionValue } from "framer-motion";

/**
 * Unfortunately animating CSS variables requires you to type the styles
 * as any in Framer Motion.
 * To prevent to do typecasting everywhere in the code, I created this small
 * wrapper function that does the casting for us, as well as still checks pretty
 * well that we either input a value motion value, or a string looking like a css
 * variable.
 * @see: https://www.framer.com/motion/component/#%23%23animating-css-variables
 */
type MotionStyleWithCssVar = {
  [K in keyof MotionStyle as K | `--${string}`]:
    | MotionStyle[K]
    | MotionValue<number>
    | MotionValue<string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | MotionValue<any>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const stylesWithCssVar = (styles: MotionStyleWithCssVar) => styles as any; // eslint-disable-line @typescript-eslint/no-explicit-any
