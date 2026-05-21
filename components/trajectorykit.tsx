"use client";

import { FadeIn } from "@/components/fade-in";
import { ArrowRight } from "lucide-react";

export function TrajectoryKit() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="section-label">Projects</span>
        <h2>TrajectoryKit</h2>
        <p className="tk-intro">
          A <strong>local-first agentic framework</strong> for running AI agents on your own hardware. Built on the idea that <strong>full observability is prerequisite to safety</strong>.
        </p>

        <FadeIn>
          <div className="trace-card">
            <div className="trace-card-header">
              <div className="trace-header-left">
                <span className="trace-dot" />
                dispatch_trace
              </div>
              <span className="trace-header-right">25e4faa4 · Qwen3-8B · local</span>
            </div>
            <div className="trace-stats">
              <div className="trace-stat">
                <span className="trace-stat-val">176s</span>
                <span className="trace-stat-lbl">Duration</span>
              </div>
              <div className="trace-stat">
                <span className="trace-stat-val">40</span>
                <span className="trace-stat-lbl">Turns</span>
              </div>
              <div className="trace-stat">
                <span className="trace-stat-val">10</span>
                <span className="trace-stat-lbl">Sub-agents</span>
              </div>
              <div className="trace-stat">
                <span className="trace-stat-val">141K</span>
                <span className="trace-stat-lbl">Tokens</span>
              </div>
            </div>
            <div>
              <div className="trace-line">
                <span className="trace-line-type">root · turn 1</span>
                <span className="trace-line-body">
                  Decomposing task → spawning <em>3 sub-agents</em> in parallel
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">sub-agent · depth 1</span>
                <span className="trace-line-body">
                  search_web("Blue-Eyes White Dragon stats") →{" "}
                  <em>{`{atk: 3000, def: 2500, level: 8}`}</em>
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">tool call</span>
                <span className="trace-line-body">
                  execute_code(matplotlib) → bar chart with strongest stats
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">sub-agent · depth 2</span>
                <span className="trace-line-body">
                  search_web("spell card ATK boost") →{" "}
                  <em>Legend of Blue-Eyes White Dragon (+300 ATK)</em>
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">root · turn 8</span>
                <span className="trace-line-body">
                  Synthesizing enhanced stats → rendering comparison<span className="blink" />
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="tk-features">
            <div className="tk-feature">
              <span className="tk-feat-label">100% local</span>
              <span className="tk-feat-desc">
                Runs on your GPU via vLLM. No APIs, no cloud.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">recursive</span>
              <span className="tk-feat-desc">
                Child agents decompose tasks independently, up to 3 levels deep.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">sandboxed</span>
              <span className="tk-feat-desc">
                Safe Python + 40+ languages via Apptainer with file I/O.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">HTML traces</span>
              <span className="tk-feat-desc">
                Self-contained reports with collapsible reasoning chains.
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="tk-ctas">
          <a
            href="https://github.com/KabakaWilliam/trajectorykit"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            GitHub
            <ArrowRight size={16} style={{ marginLeft: '4px' }} />
          </a>
          <span className="pip">pip install trajectorykit</span>
        </div>
      </div>
    </section>
  );
}
