"use client";

import { MotionConfig } from "motion/react";

/** "user" honours prefers-reduced-motion: transforms are skipped, fades kept. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
