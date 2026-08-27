"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function HeroGlowBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-28 h-[34rem] w-[165vw] -translate-x-1/2 md:top-1/2 md:-mt-64 md:h-[155%] md:w-[125vw]"
    >
      <motion.div
        className="h-full w-full"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <Image
          src="/assets/Ellipse.svg"
          alt=""
          width={1920}
          height={1444}
          priority
          fetchPriority="high"
          sizes="(min-width: 768px) 125vw, 165vw"
          className="h-full w-full object-fill"
        />
      </motion.div>
    </div>
  );
}
