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
                  <span className="project-name">pidge.watch</span>
                  <span className="project-status"><i /> Live</span>
                </div>
                <h2>Cmd+F for every Oxford college role.</h2>
                <p>
                  Search roles across Oxford colleges in one place, then follow
                  the opportunities and perks you care about—from accommodation
                  and pay to the deadlines that matter.
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
                  <span className="project-name">TrajectoryKit</span>
                  <span className="project-status">Open source</span>
                </div>
                <h2>Local-first agent observability.</h2>
                <p>
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
