"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { hero, site } from "@/lib/content";
import { useMediaQuery } from "@/lib/hooks";
import { HeroSculpture } from "./hero-sculpture";

const BASE_RX = 57;
const BASE_RZ = -40;
const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const word = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: "0em", transition: { duration: 0.85, ease } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Pointer tilt and parallax are desktop-only; tablets and phones get a still sculpture.
  const richMotion = useMediaQuery("(min-width: 1024px) and (pointer: fine)") && !reduceMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollTurn = useTransform(scrollYProgress, [0, 1], [0, richMotion ? 14 : 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, richMotion ? 90 : 0]);
  const pebbleNearY = useTransform(scrollYProgress, [0, 1], [0, richMotion ? -140 : 0]);
  const pebbleFarY = useTransform(scrollYProgress, [0, 1], [0, richMotion ? -60 : 0]);

  const rx = useTransform(springY, (v) => BASE_RX - v * 7);
  const rz = useTransform([springX, scrollTurn], ([x, s]: number[]) => BASE_RZ + x * 9 + s);
  const rotateX = useMotionTemplate`${rx}deg`;
  const rotateZ = useMotionTemplate`${rz}deg`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !richMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [richMotion, pointerX, pointerY]);

  const words = hero.headline.split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden pt-[clamp(2.5rem,6vw,5.5rem)] pb-[clamp(4rem,8vw,7rem)]"
    >
      {/* Soft organic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[18%] right-[-12%] h-[70%] w-[62%] rounded-[46%_54%_60%_40%/50%_44%_56%_50%] bg-mint opacity-70 blur-3xl max-lg:opacity-50" />
        <div className="absolute bottom-[-10%] left-[-14%] h-[48%] w-[46%] rounded-[60%_40%_48%_52%/44%_58%_42%_56%] bg-cream blur-3xl" />
        <div className="grain absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
      </div>

      <div className="page-container grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 lg:col-span-7 xl:col-span-7"
        >
          <motion.p
            variants={item}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-meta text-subtle shadow-soft"
          >
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
              <span className="relative size-2.5 rounded-full bg-primary" />
            </span>
            {site.availability}
          </motion.p>

          <h1
            id="home-title"
            className="max-w-[13ch] text-display font-medium text-ink"
          >
            <span className="sr-only">{hero.headline}</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </span>
          </h1>

          <motion.p variants={item} className="mt-8 max-w-[38rem] text-lede text-subtle">
            {hero.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <motion.a
              href="#project"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary-dark px-6 font-medium text-on-primary shadow-soft"
            >
              See selected work
              <ArrowDown
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-12 items-center rounded-full border border-line-strong bg-surface px-6 font-medium text-ink transition-colors hover:bg-primary-soft"
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y: artY }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[25rem] lg:col-span-5 lg:mr-[-4%] lg:max-w-none xl:mr-[-8%]"
          aria-hidden="true"
        >
          <HeroSculpture rotateX={rotateX} rotateZ={rotateZ} />

          <motion.div style={{ y: pebbleNearY }} className="absolute top-[6%] left-[2%] w-[13%]">
            <div className="pebble float-slower aspect-[1.1] w-full" />
          </motion.div>
          <motion.div style={{ y: pebbleFarY }} className="absolute right-[6%] bottom-[10%] w-[8%] max-sm:hidden">
            <div className="pebble float-slow aspect-square w-full opacity-80" />
          </motion.div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="grid gap-px overflow-hidden rounded-[var(--radius-inner)] border border-line bg-line sm:grid-cols-3 lg:col-span-12 lg:mt-4"
        >
          {hero.facts.map((fact) => (
            <div key={fact.label} className="bg-surface px-5 py-4 sm:px-6 sm:py-5">
              <dt className="text-meta text-subtle">{fact.label}</dt>
              <dd className="mt-1 font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
