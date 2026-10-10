"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { ProjectCover } from "./project-cover";
import { Reveal } from "./reveal";

/** Layout slots give the grid its asymmetric rhythm on wide screens. */
const slots = [
  { card: "md:col-span-2", cover: "aspect-[4/3] md:aspect-[16/9]" },
  { card: "", cover: "aspect-[4/3] md:aspect-[4/5]" },
  { card: "xl:mt-28", cover: "aspect-[4/3] md:aspect-square" },
  { card: "md:col-span-2", cover: "aspect-[4/3] md:aspect-[2/1]" },
];

const years = projects.map((p) => Number(p.year));
const yearRange = `${Math.min(...years)}–${Math.max(...years)}`;

export function ProjectsSection() {
  const [active, setActive] = useState(projects[0].slug);

  useEffect(() => {
    const cards = projects
      .map((p) => document.getElementById(`project-${p.slug}`))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace("project-", ""));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="project" aria-labelledby="project-title" className="section-space relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-cream/60 to-transparent"
      />
      <div className="page-container grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Sticky index on large screens; a plain intro above the grid elsewhere. */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <h2 id="project-title" className="text-title text-ink">
              Selected projects
            </h2>
            <p className="mt-6 max-w-[34rem] text-lede text-subtle">
              Recent work across data storytelling, design systems and experimental type. Open a project for the
              challenge, the approach and what changed.
            </p>
            <p className="mt-4 text-meta text-subtle">
              {projects.length} projects, {yearRange}
            </p>

            <nav aria-label="Project index" className="mt-10 hidden lg:block">
              <ul className="border-t border-line">
                {projects.map((p) => {
                  const isActive = active === p.slug;
                  return (
                    <li key={p.slug} className="border-b border-line">
                      <a
                        href={`#project-${p.slug}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex min-h-14 items-center justify-between gap-4 py-3"
                      >
                        <span
                          className={`flex items-center gap-3 font-display text-lg transition-colors ${
                            isActive ? "text-ink" : "text-subtle group-hover:text-ink"
                          }`}
                        >
                          <motion.span
                            aria-hidden="true"
                            className="block h-px bg-primary-dark"
                            animate={{ width: isActive ? 24 : 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          />
                          {p.title}
                        </span>
                        <span className="text-meta text-subtle tabular-nums">{p.year}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>
        </div>

        <ul className="grid items-start gap-5 md:grid-cols-2 lg:col-span-8 lg:gap-6" aria-label="Projects">
          {projects.map((project, index) => (
            <li key={project.slug} className={slots[index % slots.length].card}>
              <ProjectCard project={project} coverClass={slots[index % slots.length].cover} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, coverClass }: { project: Project; coverClass: string }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const titleId = `project-${project.slug}-title`;

  return (
    <Reveal as="article" id={`project-${project.slug}`} aria-labelledby={titleId} className="scroll-mt-28">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="group card p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <div className={`relative overflow-hidden rounded-[var(--radius-inner)] ${coverClass}`}>
          <ProjectCover variant={project.cover} label={project.coverLabel} />
          <span className="absolute top-3 left-3 rounded-full border border-line bg-surface/90 px-3 py-1 text-meta font-medium text-ink tabular-nums">
            {project.year}
          </span>
        </div>

        <div className="px-3 pt-5 pb-3 sm:px-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 id={titleId} className="text-heading text-ink">
              {project.title}
            </h3>
            <p className="text-meta text-subtle">{project.role}</p>
          </div>
          <p className="mt-3 max-w-[60ch] text-subtle">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Disciplines and tools">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-primary-soft px-3 py-1 text-meta text-primary-dark">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 font-medium text-primary-dark"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="inline-flex size-7 items-center justify-center rounded-full border border-line-strong"
                aria-hidden="true"
              >
                <Plus className="size-4" strokeWidth={2} />
              </motion.span>
              {open ? "Hide details" : "Show details"}
            </button>
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>

          <div id={detailsId}>
            <AnimatePresence initial={false}>
              {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <dl className="grid gap-4 pt-4">
                  {project.details.map((d) => (
                    <div key={d.label} className="grid gap-0.5">
                      <dt className="text-sm font-medium text-ink">{d.label}</dt>
                      <dd className="text-sm text-subtle">{d.text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
