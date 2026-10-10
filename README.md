# Fachru — Creative Developer portfolio

Single-page portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, Motion for React and Lucide icons. Managed with Bun.

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build (fully static)
bun run lint
```

## Editing content

All copy, links and metadata live in [`src/lib/content.ts`](src/lib/content.ts). Values marked `PLACEHOLDER` are stand-ins: the domain (`site.url`, used for canonical and Open Graph URLs), email, location, availability, social profiles, timeline, projects and notes.

- **Portrait:** replace `public/images/portrait.svg` with a real photo (e.g. `portrait.jpg`) and update the `src` in `src/components/about-section.tsx`.
- **Project links:** add `links: [{ label, href }]` to a project and the card renders them.
- **Note links:** add `href` to a note to make its title clickable.
- **Open Graph image:** generated at build time by `src/app/opengraph-image.tsx` from the hero headline.

## Structure

```
src/app/            layout (fonts, metadata, theme script), page, OG image, icon, robots, sitemap
src/components/     header + theme toggle, hero + CSS-3D sculpture, about, projects, notes, contact, footer
src/lib/content.ts  all site content
src/lib/theme.ts    theme persistence and the pre-paint init script
src/lib/hooks.ts    useMediaQuery, useActiveSection
src/app/globals.css design tokens (light/dark), Tailwind theme bridge, sculpture styles
```

## Design tokens

Colors are CSS custom properties on `:root` (light) and `[data-theme="dark"]`, bridged into Tailwind as `bg-surface`, `text-ink`, `text-subtle`, `border-line`, `bg-primary-dark`, etc. Derived tones (soft fills, sculpture shading, shadows) are computed with `color-mix()` so both themes stay in sync. Components never hardcode theme colors.

`--muted` (#747D75) is just under 4.5:1 on the light background, so small secondary text uses `--text-secondary` (a slightly deeper mix) to meet WCAG AA.

## Theme

An inline script in `<head>` sets `data-theme` before first paint from the saved choice, falling back to the system setting, so there's no flash. The toggle persists to `localStorage`, follows system changes until a choice is made, and cross-fades colors only while switching. With JavaScript disabled, a `prefers-color-scheme` media query still applies the dark palette.

## Motion

- Motion's `MotionConfig reducedMotion="user"` drops transform animations for reduced-motion users; CSS float loops and smooth scrolling are also disabled.
- Pointer tilt and scroll parallax on the hero only run on large screens with a fine pointer.
- Section reveals run once, and content is forced visible when JavaScript is off.
