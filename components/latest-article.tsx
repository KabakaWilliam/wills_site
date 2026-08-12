"use client";

import { FadeIn } from "@/components/fade-in";
import { papers } from "@/lib/site-content";

export function LatestArticle() {
  return (
    <section id="research" className="section research">
      <div className="container">
        <p className="section-label">Research</p>

        {papers.map((paper) => (
          <FadeIn key={paper.href}>
            <a href={paper.href} target="_blank" rel="noreferrer" className="paper">
              <div>
                <div className="paper-title">{paper.title}</div>
                <p className="paper-abstract">{paper.abstract}</p>
                <div className="paper-meta">{paper.meta}</div>
              </div>
              <div>
                <div className="paper-date">{paper.date}</div>
                <span className="paper-arrow">→</span>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
