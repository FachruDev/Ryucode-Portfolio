import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { site, socials } from "@/lib/content";
import { CopyEmail } from "./copy-email";
import { Reveal } from "./reveal";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-[clamp(3rem,6vw,5rem)]">
      <div className="page-container">
        <Reveal className="relative isolate overflow-hidden rounded-[calc(var(--radius-card)+0.5rem)] bg-primary-dark px-6 py-14 text-on-primary sm:px-10 md:py-20 lg:px-16 lg:py-24">
          {/* Organic forms, tinted from the same tokens */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 size-[26rem] rounded-[58%_42%_55%_45%/52%_48%_52%_48%] bg-primary opacity-40 max-md:size-72" />
            <div className="absolute -right-6 bottom-[-7rem] size-64 rounded-[44%_56%_40%_60%/58%_40%_60%_42%] bg-primary opacity-25 max-md:hidden" />
            <div className="orb absolute top-[18%] right-[16%] size-20 opacity-90 max-lg:hidden" />
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 id="contact-title" className="max-w-[16ch] text-title text-on-primary">
                Tell me about the thing you want to build.
              </h2>
              <p className="mt-6 max-w-[44ch] text-lede text-on-primary/80">
                Commissions, collaborations or a question about something on this page. I reply within two working days.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="mt-10 inline-block font-display text-[clamp(1.5rem,0.9rem+3.2vw,3.5rem)] leading-tight font-medium tracking-[-0.03em] break-all text-on-primary underline decoration-on-primary/35 decoration-2 underline-offset-[0.18em] transition-[text-decoration-color] hover:decoration-on-primary focus-visible:outline-on-primary sm:break-normal"
              >
                {site.email}
              </a>
              <div className="mt-6">
                <CopyEmail email={site.email} />
              </div>
            </div>

            <div className="flex flex-col justify-end gap-10 lg:col-span-4">
              <dl className="space-y-4 text-on-primary/85">
                <div className="flex gap-3">
                  <dt>
                    <MapPin className="mt-0.5 size-5" strokeWidth={1.75} aria-hidden="true" />
                    <span className="sr-only">Location</span>
                  </dt>
                  <dd>{site.location}</dd>
                </div>
                <div className="flex gap-3">
                  <dt>
                    <Clock className="mt-0.5 size-5" strokeWidth={1.75} aria-hidden="true" />
                    <span className="sr-only">Availability</span>
                  </dt>
                  <dd>{site.availability}</dd>
                </div>
              </dl>

              <nav aria-label="Social profiles">
                <ul className="border-t border-on-primary/20">
                  {socials.map((s) => (
                    <li key={s.label} className="border-b border-on-primary/20">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer me"
                        className="group flex min-h-14 items-center justify-between gap-4 focus-visible:outline-on-primary"
                      >
                        <span className="font-medium">{s.label}</span>
                        <span className="flex items-center gap-2 text-sm text-on-primary/75">
                          {s.handle}
                          <ArrowUpRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
