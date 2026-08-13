"use client";

import { FadeIn } from "@/components/fade-in";
import { papers } from "@/lib/site-content";

export function LatestArticle() {
  return (
    <section id="research" className="section research">
      <div className="container">
        <div className="section-heading-row">
          <p className="section-label">Selected publications</p>
          <a className="section-link" href="https://scholar.google.com/citations?user=_lcpYZkAAAAJ&hl=en" target="_blank" rel="noreferrer">All on Scholar ↗</a>
        </div>

        {papers.map((paper) => (
          <FadeIn key={paper.href}>
            <a href={paper.href} target="_blank" rel="noreferrer" className="paper">
              <div>
                <div className="paper-title">{paper.title}</div>
                <p className="paper-abstract">{paper.abstract}</p>
                <div className="paper-meta">{paper.meta}</div>
              </div>
              <span className="paper-link">Paper ↗</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
