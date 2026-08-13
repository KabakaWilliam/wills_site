"use client";

import { FadeIn } from "@/components/fade-in";

export function SelectedProjects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <p className="section-label">Selected projects</p>
        <div className="project-grid">
          <FadeIn>
            <article className="project-card project-card-featured">
              <div>
                <div className="project-card-header">
                  <span className="project-name">pidge.watch</span>
                  <span className="project-status"><i /> Live</span>
                </div>
                <h2>Never miss an Oxford college role.</h2>
                <p>
                  A focused role watchlist that monitors official vacancy pages
                  and alerts people to matching opportunities and deadlines.
                </p>
              </div>
              <a href="https://pidge.watch" target="_blank" rel="noreferrer">
                Visit Pidge <span aria-hidden="true">↗</span>
              </a>
            </article>
          </FadeIn>

          <FadeIn>
            <article className="project-card">
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
              <div className="project-links">
                <a href="https://github.com/KabakaWilliam/trajectorykit" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="https://pypi.org/project/trajectorykit/" target="_blank" rel="noreferrer">PyPI ↗</a>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
