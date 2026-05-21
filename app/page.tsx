import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { LatestArticle } from "@/components/latest-article";
import { TrajectoryKit } from "@/components/trajectorykit";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="home">
        <Hero />
        <LatestArticle />
        <TrajectoryKit />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
