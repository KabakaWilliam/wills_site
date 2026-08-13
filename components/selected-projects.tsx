"use client";

import { FadeIn } from "@/components/fade-in";

export function SelectedProjects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="projects-backdrop projects-backdrop-pidge" aria-hidden="true" />
      <div className="projects-backdrop projects-backdrop-trajectory" aria-hidden="true" />
      <div className="container">
        <p className="section-label">Selected projects</p>
        <div className="project-grid">
          <FadeIn>
            <a
              className="project-card project-card-featured project-card-pidge"
              href="https://pidge.watch"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Pidge"
            >
              <div>
                <div className="project-card-header">
                  <span className="project-status"><i /> Live</span>
                </div>
                <h2>pidge.watch</h2>
                <p className="project-proposition">
                  Tell us what Oxford role you want. Know when it appears.
                </p>
                <p className="project-description">
                  Oxford jobs are scattered across dozens of college sites and
                  can appear without warning. Tell Pidge the role, college, or
                  perk you want—it watches for matches and alerts you the moment
                  one appears.
                </p>
              </div>
              <span className="project-card-link">Visit Pidge <i aria-hidden="true">↗</i></span>
            </a>
          </FadeIn>

          <FadeIn>
            <a
              className="project-card project-card-trajectory"
              href="https://github.com/KabakaWilliam/trajectorykit"
              target="_blank"
              rel="noreferrer"
              aria-label="View TrajectoryKit on GitHub"
            >
              <div>
                <div className="project-card-header">
                  <span className="project-status">Open source</span>
                </div>
                <h2>TrajectoryKit</h2>
                <p className="project-proposition">Local-first agent observability.</p>
                <p className="project-description">
                  Run agents on your own hardware and inspect every turn, tool
                  call, reasoning chain, and sub-agent trace.
                </p>
              </div>
              <div className="project-card-footer">
                <span className="project-result"><i aria-hidden="true">🏆</i> #6 on DeepResearch Bench</span>
                <span className="project-card-link">GitHub <i aria-hidden="true">↗</i></span>
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
