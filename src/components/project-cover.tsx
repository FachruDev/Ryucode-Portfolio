import type { CoverVariant } from "@/lib/content";

/**
 * Token-driven cover art for each project. Pure markup, so it re-themes
 * with the rest of the page and costs no image requests. Hover states are
 * driven by the parent card's `group` class.
 */
export function ProjectCover({ variant, label }: { variant: CoverVariant; label: string }) {
  return (
    <div role="img" aria-label={label} className="cover-surface absolute inset-0 overflow-hidden">
      {variant === "tide" && <TideCover />}
      {variant === "kit" && <KitCover />}
      {variant === "rooms" && <RoomsCover />}
      {variant === "type" && <TypeCover />}
    </div>
  );
}

const ease = "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

function TideCover() {
  const rings = [210, 168, 130, 96, 66, 40];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${ease} group-hover:scale-[1.04]`}
      aria-hidden="true"
    >
      {rings.map((r, i) => (
        <ellipse
          key={r}
          cx="120"
          cy="250"
          rx={r * 1.25}
          ry={r * 0.82}
          fill={i % 2 === 0 ? "var(--primary-soft)" : "var(--mint)"}
          stroke="var(--border-strong)"
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M180 ${86 + i * 22} C 230 ${70 + i * 22}, 270 ${104 + i * 22}, 320 ${86 + i * 22} S 380 ${74 + i * 22}, 420 ${88 + i * 22}`}
          fill="none"
          stroke="var(--primary-dark)"
          strokeOpacity={0.75 - i * 0.15}
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`${ease} group-hover:-translate-x-3`}
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
      <circle cx="120" cy="250" r="11" fill="var(--primary-dark)" />
    </svg>
  );
}

function KitCover() {
  return (
    <div className="absolute inset-0 grid place-items-center [perspective:900px]" aria-hidden="true">
      <div className="relative h-[62%] w-[56%] [transform-style:preserve-3d] [transform:rotateX(52deg)_rotateZ(-32deg)]">
        <div
          className={`absolute inset-0 rounded-[1.25rem] border border-line bg-surface shadow-soft ${ease} group-hover:[transform:translateZ(-6px)]`}
        >
          <div className="m-[9%] space-y-[6%]">
            <div className="h-2.5 w-1/2 rounded-full bg-primary-soft" />
            <div className="h-2.5 w-3/4 rounded-full bg-mint" />
            <div className="h-2.5 w-2/5 rounded-full bg-primary-soft" />
          </div>
        </div>
        <div
          className={`absolute top-[16%] right-[-12%] flex h-[22%] w-[44%] items-center rounded-full border border-line bg-primary-dark px-[4%] shadow-soft [transform:translateZ(26px)] ${ease} group-hover:[transform:translateZ(58px)]`}
        >
          <div className="ml-auto aspect-square h-[72%] rounded-full bg-on-primary" />
        </div>
        <div
          className={`absolute bottom-[10%] left-[-10%] grid h-[22%] w-[54%] place-items-center rounded-full bg-primary shadow-soft [transform:translateZ(18px)] ${ease} delay-75 group-hover:[transform:translateZ(44px)]`}
        >
          <div className="h-[18%] w-1/2 rounded-full bg-surface/80" />
        </div>
      </div>
    </div>
  );
}

function RoomsCover() {
  const arches = [
    { w: 250, fill: "var(--surface)" },
    { w: 196, fill: "var(--mint)" },
    { w: 148, fill: "var(--primary-soft)" },
    { w: 104, fill: "var(--primary)" },
    { w: 62, fill: "var(--primary-dark)" },
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect x="0" y="238" width="400" height="62" fill="var(--cream)" />
      {arches.map((a, i) => {
        const h = a.w * 1.05;
        const x = 200 - a.w / 2 + i * 6;
        const y = 238 - h;
        return (
          <path
            key={a.w}
            d={`M${x} 238 L${x} ${y + a.w / 2} A ${a.w / 2} ${a.w / 2} 0 0 1 ${x + a.w} ${y + a.w / 2} L ${x + a.w} 238 Z`}
            fill={a.fill}
            stroke="var(--border-strong)"
            strokeWidth="1"
            className={`${ease} group-hover:translate-x-[var(--shift)]`}
            style={{ ["--shift" as string]: `${i * 4}px`, transitionDelay: `${i * 40}ms` }}
          />
        );
      })}
    </svg>
  );
}

function TypeCover() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className={`absolute top-[12%] left-[8%] size-[46%] rounded-[58%_42%_55%_45%/52%_48%_52%_48%] bg-mint ${ease} group-hover:translate-x-4 group-hover:rotate-12`}
      />
      <div
        className={`absolute right-[10%] bottom-[8%] size-[34%] rounded-[44%_56%_40%_60%/58%_40%_60%_42%] bg-primary-soft ${ease} group-hover:-translate-y-3 group-hover:-rotate-6`}
      />
      <span className="absolute inset-0 grid place-items-center font-display text-[clamp(5rem,14vw,10rem)] leading-none font-semibold tracking-[-0.08em] text-primary-dark">
        <span className={`${ease} group-hover:scale-[1.06]`}>Aa</span>
      </span>
    </div>
  );
}
