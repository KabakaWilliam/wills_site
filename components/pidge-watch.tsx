"use client";

import { FadeIn } from "@/components/fade-in";

export function PidgeWatch() {
  return (
    <section id="projects" className="section pidge-section">
      <div className="container">
        <div className="section-heading-row">
          <p className="section-label">Featured project</p>
          <span className="live-badge"><i /> Live</span>
        </div>
        <div className="pidge-grid">
          <div className="pidge-copy">
            <p className="pidge-wordmark">pidge<span>.watch</span></p>
            <h2>Never miss an Oxford college role.</h2>
            <p>
              Pidge monitors official college vacancy pages, gathers open roles
              in one place, and pings you when a matching opportunity lands or
              a deadline is close.
            </p>
            <div className="project-actions">
              <a className="project-primary" href="https://pidge.watch" target="_blank" rel="noreferrer">
                Explore Pidge <span aria-hidden="true">↗</span>
              </a>
              <span>Built and launched in Oxford</span>
            </div>
          </div>
          <FadeIn>
            <div className="pidge-preview" aria-label="A sample Pidge role alert">
              <div className="pidge-preview-top">
                <span className="pidge-mark">P</span>
                <span>Pidge found a match</span>
                <i />
              </div>
              <div className="pidge-role">
                <span className="pidge-eyebrow">Closes in 4 days</span>
                <strong>Junior Dean</strong>
                <p>Oxford college · Accommodation included</p>
                <div>
                  <span>Welfare</span><span>Graduate</span><span>Live-in</span>
                </div>
              </div>
              <div className="pidge-preview-foot">One useful ping. No trawling 40+ sites.</div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
