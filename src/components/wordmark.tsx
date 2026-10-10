import { site } from "@/lib/content";

/** The Fachru wordmark: a seed-and-leaf glyph beside the name. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden="true">
        <circle cx="11" cy="16" r="8" fill="var(--primary)" />
        <path d="M14 14C14 7.5 18.5 4 25 4c0 6.5-4 10.5-11 10Z" fill="var(--primary-dark)" />
      </svg>
      <span className="font-display text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">{site.name}</span>
    </span>
  );
}
