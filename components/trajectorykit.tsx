"use client";

import { FadeIn } from "@/components/fade-in";

export function TrajectoryKit() {
  return (
    <section className="section tk-section">
      <div className="container">
        <p className="section-label">Open-source project</p>
        <h2>TrajectoryKit</h2>
        <p className="tk-intro">
          A <strong>local-first agentic framework</strong> for running AI agents
          on your own hardware (BYOK). Built on the idea that{" "}
          <strong>full observability is prerequisite to safety</strong>: every
          turn, reasoning chain, tool call, and sub-agent is captured in a
          structured trace and rendered as a readable HTML report.
        </p>

        <FadeIn>
          <div className="trace-card">
            <div className="trace-card-header">
              <div className="trace-header-left">
                <span className="trace-dot" />
                dispatch_trace
              </div>
              <span className="trace-header-right">
                25e4faa4 · Qwen/Qwen3-8B · local
              </span>
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
                  for card stats lookup
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">sub-agent · depth 1</span>
                <span className="trace-line-body">
                  search_web(&quot;Blue-Eyes White Dragon stats&quot;) →{" "}
                  <em>{"{atk: 3000, def: 2500, level: 8}"}</em>
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">tool call</span>
                <span className="trace-line-body">
                  execute_code(matplotlib) → bar chart with ★ annotation on
                  strongest monster
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">sub-agent · depth 2</span>
                <span className="trace-line-body">
                  search_web(&quot;spell card ATK boost&quot;) →{" "}
                  <em>Legend of Blue-Eyes White Dragon (+300 ATK)</em>
                </span>
              </div>
              <div className="trace-line">
                <span className="trace-line-type">root · turn 8</span>
                <span className="trace-line-body">
                  Synthesizing enhanced stats → rendering final comparison
                  <span className="blink" />
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
                Runs on your own GPU via vLLM. No API keys, no cloud dependency.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">recursive sub-agents</span>
              <span className="tk-feat-desc">
                Spawn child agents to decompose complex tasks independently,
                each with its own nested trace, up to 3 levels deep.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">sandboxed execution</span>
              <span className="tk-feat-desc">
                Run Python and 40+ languages safely via Apptainer, with file I/O
                and image retrieval.
              </span>
            </div>
            <div className="tk-feature">
              <span className="tk-feat-label">HTML trace viewer</span>
              <span className="tk-feat-desc">
                Self-contained trace reports with collapsible reasoning chains,
                inline images, and full token accounting.
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="tk-ctas">
          <a
            href="https://github.com/KabakaWilliam/trajectorykit"
            target="_blank"
            className="cta-primary"
          >
            GitHub →
          </a>
          <a
            href="https://pypi.org/project/trajectorykit/"
            target="_blank"
            className="cta-secondary"
          >
            PyPI
          </a>
          <span className="pip">pip install trajectorykit</span>
        </div>
      </div>
    </section>
  );
}
