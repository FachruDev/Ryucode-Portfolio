import { Reveal } from "./reveal";

/** Editorial section opener: large title on the left, a short lede offset to the right. */
export function SectionHeading({
  id,
  title,
  lede,
  className = "",
}: {
  id: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <Reveal className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <h2 id={id} className="text-title text-ink md:col-span-7">
        {title}
      </h2>
      {lede && <p className="max-w-[34rem] text-lede text-subtle md:col-span-5 md:pb-2">{lede}</p>}
    </Reveal>
  );
}
