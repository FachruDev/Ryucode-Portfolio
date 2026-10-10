import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { NotesSection } from "@/components/notes-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <NotesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
