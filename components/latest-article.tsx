"use client";

"use client";

import { FadeIn } from "@/components/fade-in";
import { ArrowRight } from "lucide-react";

export function LatestArticle() {
  return (
    <section id="research" className="section">
      <div className="container">
        <span className="section-label">Research</span>

        <FadeIn>
          <a
            href="https://arxiv.org/abs/2605.14786"
            target="_blank"
            rel="noopener noreferrer"
            className="paper"
          >
            <div>
              <div className="paper-title">
                Known By Their Actions: Fingerprinting LLM Browser Agents via UI Traces
              </div>
              <p className="paper-abstract">
                Websites silently fingerprint which LLM powers a browser agent just by observing its actions
              </p>
              <div className="paper-meta">arXiv:2605.14786 · Computer-use agents · Security</div>
            </div>
            <div>
              <span className="paper-date">May 2026</span>
              <ArrowRight size={18} />
            </div>
          </a>
        </FadeIn>

        <FadeIn>
          <a
            href="https://arxiv.org/abs/2602.09924"
            target="_blank"
            rel="noopener noreferrer"
            className="paper"
          >
            <div>
              <div className="paper-title">
                LLMs Encode Their Failures: Predicting Success from Pre-Generation Activations
              </div>
              <p className="paper-abstract">
                Internal representations predict task success before generation begins
              </p>
              <div className="paper-meta">ICLR LIT 2026 · Mechanistic interpretability · Inference routing</div>
            </div>
            <div>
              <span className="paper-date">Feb 2026</span>
              <ArrowRight size={18} />
            </div>
          </a>
        </FadeIn>

        <FadeIn>
          <a
            href="https://arxiv.org/abs/2510.18147"
            target="_blank"
            rel="noopener noreferrer"
            className="paper"
          >
            <div>
              <div className="paper-title">
                LLMs Encode How Difficult Problems Are
              </div>
              <p className="paper-abstract">
                Models represent problem difficulty in activation space through geometric structure
              </p>
              <div className="paper-meta">arXiv:2510.18147 · Representation learning · Probing</div>
            </div>
            <div>
              <span className="paper-date">Oct 2025</span>
              <ArrowRight size={18} />
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
