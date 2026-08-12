import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { LatestArticle } from "@/components/latest-article";
import { News } from "@/components/news";
import { PidgeWatch } from "@/components/pidge-watch";
import { TrajectoryKit } from "@/components/trajectorykit";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <News />
        <LatestArticle />
        <PidgeWatch />
        <TrajectoryKit />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
