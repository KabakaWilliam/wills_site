"use client";

import { FadeIn } from "@/components/fade-in";

export function LatestArticle() {
  return (
    <section id="research" className="section">
      <div className="container">
        <p className="section-label">Research</p>

        <FadeIn>
          <a
            href="https://arxiv.org/abs/2602.09924"
            target="_blank"
            className="paper"
          >
            <div>
              <div className="paper-title">
                LLMs Encode Their Failures: Predicting Success from
                Pre-Generation Activations
              </div>
              <p className="paper-abstract">
                Language models&apos; internal representations contain signal
                about whether they&apos;ll succeed on a task — before generation
                begins. We show this can be extracted to route inference
                efficiently, reducing costs while maintaining performance.
              </p>
              <div className="paper-meta">
                (under review, 2026) &nbsp;·&nbsp; mechanistic interpretability
                &nbsp;·&nbsp; inference routing
              </div>
            </div>
            <div>
              <div className="paper-date">Feb 2026</div>
              <span className="paper-arrow">→</span>
            </div>
          </a>
        </FadeIn>

        <FadeIn>
          <a
            href="https://arxiv.org/abs/2510.18147"
            target="_blank"
            className="paper"
          >
            <div>
              <div className="paper-title">
                LLMs Encode How Difficult Problems Are
              </div>
              <p className="paper-abstract">
                LLMs linearly represent the difficulty of math and coding
                problems in their activation space. This geometric structure has
                implications for adaptive inference, curriculum learning, and
                understanding model confidence.
              </p>
              <div className="paper-meta">
                arXiv:2510.18147 &nbsp;·&nbsp; representation learning
                &nbsp;·&nbsp; probing
              </div>
            </div>
            <div>
              <div className="paper-date">Oct 2025</div>
              <span className="paper-arrow">→</span>
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
