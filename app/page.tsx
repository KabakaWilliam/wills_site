import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { LatestArticle } from "@/components/latest-article";
// import { ProjectsGrid } from "@/components/projects-grid";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-12 md:space-y-24">
        <Hero />
        <LatestArticle />
        {/* <ProjectsGrid /> */}
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
