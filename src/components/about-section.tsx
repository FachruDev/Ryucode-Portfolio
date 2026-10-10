import Image from "next/image";
import { Sprout } from "lucide-react";
import { about, site } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-space">
      <div className="page-container">
        <SectionHeading
          id="about-title"
          title="About"
          lede="A designer’s eye and an engineer’s habits, applied to the parts of a product people actually touch."
        />

        {/* Bento grid: 12 columns on desktop, 2 on tablet, a single stack on phones. */}
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <Reveal className="card p-7 sm:p-9 md:col-span-2 lg:col-span-7">
            <h3 className="max-w-[20ch] text-heading text-ink">{about.heading}</h3>
            <div className="mt-6 max-w-[62ch] space-y-4 text-subtle">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="card relative overflow-hidden max-md:order-first md:col-span-1 md:row-span-2 lg:col-span-5"
          >
            <figure className="h-full">
              <div className="relative aspect-[5/4] w-full md:aspect-auto md:h-full md:min-h-[26rem]">
                <Image
                  src="/images/portrait.svg"
                  alt={`Illustrated portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 768px) 48vw, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-full border border-line bg-surface/90 px-4 py-2.5 text-meta text-subtle backdrop-blur-sm">
                <span className="font-medium text-ink">{site.name}</span>
                <span>{site.role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.04} className="card p-7 sm:p-8 lg:col-span-4">
            <h3 className="font-display text-lg font-medium text-ink">What I do</h3>
            <ul className="mt-5 divide-y divide-line">
              {about.capabilities.map((c) => (
                <li key={c.title} className="py-3.5 first:pt-0 last:pb-0">
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="mt-0.5 text-sm text-subtle">{c.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="card bg-primary-soft p-7 sm:p-8 max-md:order-last lg:col-span-3">
            <h3 className="font-display text-lg font-medium text-ink">Toolkit</h3>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools and technologies">
              {about.toolkit.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm text-ink"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.04} className="card p-7 sm:p-8 md:col-span-2 lg:col-span-7">
            <h3 className="font-display text-lg font-medium text-ink">Experience</h3>
            <ol className="relative mt-6 space-y-6 border-l border-line-strong pl-6">
              {about.timeline.map((entry) => (
                <li key={entry.period} className="relative">
                  <span
                    className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-primary ring-4 ring-surface"
                    aria-hidden="true"
                  />
                  <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="text-sm text-subtle tabular-nums">{entry.period}</p>
                    <div>
                      <p className="font-medium text-ink">{entry.role}</p>
                      <p className="text-sm text-subtle">{entry.place}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal
            delay={0.08}
            className="card relative overflow-hidden bg-cream p-7 sm:p-8 md:col-span-2 lg:col-span-5"
          >
            <div
              className="pointer-events-none absolute -right-10 -bottom-12 size-44 rounded-[58%_42%_55%_45%/52%_48%_52%_48%] bg-mint"
              aria-hidden="true"
            />
            <div className="relative">
              <Sprout className="size-6 text-primary-dark" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink">Off screen</h3>
              <p className="mt-2 max-w-[44ch] text-subtle">{about.offScreen}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
