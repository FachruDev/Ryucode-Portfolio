import { ArrowUpRight, Check, Quote } from "lucide-react";
import { notes, type Note } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

// Fixed locale and zone keep server output deterministic.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const tone: Record<Note["kind"], string> = {
  Essay: "bg-surface",
  "Field note": "bg-surface",
  "Today I learned": "bg-cream",
  Quote: "bg-primary-soft",
  List: "bg-surface",
};

export function NotesSection() {
  return (
    <section id="notes" aria-labelledby="notes-title" className="section-space">
      <div className="page-container">
        <SectionHeading
          id="notes-title"
          title="Notes"
          lede="Short writing on motion, interface craft and the small decisions that make the web feel considered."
        />

        {/* Masonry via CSS columns: natural reading order within each column, no JS layout. */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 md:mt-16 lg:columns-3 lg:gap-5">
          {notes.map((note, index) => (
            <Reveal
              as="article"
              key={note.slug}
              delay={(index % 3) * 0.05}
              aria-labelledby={`note-${note.slug}`}
              className={`card mb-4 break-inside-avoid p-6 sm:p-7 lg:mb-5 ${tone[note.kind]}`}
            >
              <NoteBody note={note} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoteBody({ note }: { note: Note }) {
  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-subtle">
      <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-ink">{note.kind}</span>
      <time dateTime={note.date}>{dateFormat.format(new Date(note.date))}</time>
      {note.readingTime && <span>{note.readingTime}</span>}
    </p>
  );

  if (note.kind === "Quote") {
    return (
      <figure>
        <Quote className="size-6 text-primary-dark" strokeWidth={1.5} aria-hidden="true" />
        <h3 id={`note-${note.slug}`} className="sr-only">
          {note.title}
        </h3>
        <blockquote className="mt-4 font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.75rem)] leading-snug tracking-[-0.02em] text-ink">
          {note.body}
        </blockquote>
        <figcaption className="mt-5">{meta}</figcaption>
      </figure>
    );
  }

  return (
    <>
      {meta}
      <h3 id={`note-${note.slug}`} className="mt-4 font-display text-xl leading-snug font-medium tracking-[-0.015em] text-ink">
        {note.href ? (
          <a href={note.href} className="underline-offset-4 hover:underline">
            {note.title}
          </a>
        ) : (
          note.title
        )}
      </h3>
      {Array.isArray(note.body) ? (
        <ul className="mt-4 space-y-2.5">
          {note.body.map((line) => (
            <li key={line} className="flex gap-3 text-subtle">
              <Check className="mt-1 size-4 shrink-0 text-primary-dark" strokeWidth={2} aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-subtle">{note.body}</p>
      )}
      {note.href && (
        <a
          href={note.href}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-medium text-primary-dark"
          aria-label={`Read “${note.title}”`}
        >
          Read note
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </>
  );
}
