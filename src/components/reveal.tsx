"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * A quiet, once-only reveal for section content. Reduced-motion users get
 * the opacity change only (MotionConfig drops the transform).
 */
export function Reveal({ delay = 0, as = "div", children, ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      data-reveal
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
