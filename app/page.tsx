import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { LatestArticle } from "@/components/latest-article";
import { SelectedProjects } from "@/components/selected-projects";
import { News } from "@/components/news";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <LatestArticle />
        <SelectedProjects />
        <News />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
