import { navItems, site } from "@/lib/content";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="page-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Wordmark />
          <p className="text-meta text-subtle">
            © {site.copyrightYear} {site.name}. Designed and built by hand.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="inline-flex min-h-11 items-center text-subtle hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
