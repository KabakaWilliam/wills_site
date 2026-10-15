import { Fragment } from "react";
import Link from "next/link";
import { ProfileLinks } from "@/components/profile-links";
import { AcademicInteractions } from "@/components/academic-interactions";
import { Honeypot } from "@/components/honeypot";
import { IntroLandscape } from "@/components/intro-landscape";
import { ProjectPixel } from "@/components/project-pixel";
import { papers } from "@/lib/site-content";
import "./academic-home.css";

export default function Home() {
  return (
    <div className="academic-home">
      <header>
          <div className="identity">
            <div>
              <h1>William Lugoloobi</h1>
              <p className="affiliation">PhD student · Oxford Internet Institute</p>
            </div>
            <div className="portrait-wrap">
              <button className="portrait" type="button" aria-label="Play William’s GPU quest" aria-haspopup="dialog" data-photo="false">
                <span className="portrait-inner" aria-hidden="true">
                  <span className="portrait-face portrait-illustration"><img src="/note_hero.png" width="100" height="100" alt="" /></span>
                  <span className="portrait-face portrait-photo"><img src="/hero_pic.jpg" width="100" height="100" alt="" /></span>
                </span>
              </button>
            </div>
          </div>
          <nav aria-label="Page navigation">
            <a href="#research">Research</a>
            <a href="#projects">Projects</a>
            <a href="#writing">Writing</a>
            <a href="#news">News</a>
            <Link className="academic-cv" href="/cv">CV <span aria-hidden="true">→</span></Link>
          </nav>
        </header>

        <main>
          <section className="bio" aria-label="About William">
            <IntroLandscape>
            <p className="lead">I train and build reliable AI agents.</p>
            <p>I'm a third-year PhD student at the <a href="https://www.oii.ox.ac.uk/">Oxford Internet Institute</a>, advised by <a href="https://www.oii.ox.ac.uk/people/profiles/joss-wright/">Joss Wright</a> and <a href="https://www.oii.ox.ac.uk/people/profiles/chris-russell/">Chris Russell</a>. My research explores what models know about their own capabilities, and how that can help agents stay reliable over longer tasks.</p>
            <p>I'm also a Research Scientist Intern at <a href="https://www.thomsonreuters.com/en/artificial-intelligence/ai-overview">Thomson Reuters</a>, working on post-training and harness optimisation for agents.</p>
            <ProfileLinks className="elsewhere" />
            </IntroLandscape>
          </section>

          <section id="research" aria-labelledby="research-title">
            <div className="section-heading">
              <h2 id="research-title">Selected research</h2>
              <a href="https://scholar.google.com/citations?user=_lcpYZkAAAAJ&amp;hl=en">All publications</a>
            </div>
            <ul className="papers">
              {papers.map(paper => (
                <li key={paper.href}>
                  <div className="paper-topline">
                    <span className={"venue-label" + (paper.preprint ? " venue-label--preprint" : "")}>{paper.venue}</span>
                    <a className="paper-read" href={paper.href} aria-label={"Read paper: " + paper.title}>Read paper <span aria-hidden="true">↗</span></a>
                  </div>
                  <h3><a href={paper.href}>{paper.title}</a></h3>
                  <p className="paper-authors">{paper.authors.map((author, index) => (
                    <Fragment key={author}>{index > 0 ? ", " : ""}{author === "William Lugoloobi" ? <strong>{author}</strong> : author}</Fragment>
                  ))}</p>
                  <p className="paper-summary">{paper.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">Things I'm building</h2>
            <p className="section-intro">I build things I wish existed.</p>
            <ul className="projects">
              <li className="project-feature">
                <ProjectPixel name="pidge" />
                <div className="project-content">
                <h3><a className="project-destination" href="https://pidge.watch">pidge.watch <span aria-hidden="true">↗</span></a></h3>
                <p className="project-promise">Tell us what Oxford role you want. Know when it appears.</p>
                <p className="project-summary">One search across Oxford’s scattered opportunities, with alerts when something matches.</p>
                </div>
              </li>
              <li className="project-feature">
                <ProjectPixel name="terminal" />
                <div className="project-content">
                <h3><a className="project-destination" href="https://github.com/KabakaWilliam/trajectorykit">TrajectoryKit <span aria-hidden="true">↗</span></a></h3>
                <p className="project-promise">Run agents locally. See what they do.</p>
                <p className="project-summary">Inspect turns, tool calls, and sub-agent traces to understand how a run unfolds.</p>
                <div className="project-note">
                  <span><span aria-hidden="true">🏆</span> #6 on DeepResearch Bench</span>
                  <Link className="project-story" href="/blog/building-trajectorykit">How we built it</Link>
                </div>
                </div>
              </li>
            </ul>
          </section>

          <section id="writing" aria-labelledby="writing-title">
            <div className="section-heading">
              <h2 id="writing-title">Writing</h2>
              <Link href="/blog">All posts</Link>
            </div>
            <article className="writing-entry" aria-labelledby="trajectorykit-essay-title">
              <time dateTime="2026-03-23">March 2026</time>
              <h3 className="writing-title" id="trajectorykit-essay-title"><Link href="/blog/building-trajectorykit">We Built a Competitive Deep Research Agent Without Fine-Tuning</Link></h3>
              <p className="writing-summary">Harness design, a 20B model, and what the numbers might be hiding.</p>
              <Link className="writing-read" href="/blog/building-trajectorykit" aria-label="Read essay: We Built a Competitive Deep Research Agent Without Fine-Tuning">Read essay <span aria-hidden="true">→</span></Link>
            </article>
          </section>

          <section id="news" aria-labelledby="news-title">
            <h2 id="news-title">News</h2>
            <ul className="updates">
              <li><time dateTime="2026-10">Oct 2026</time><p><a href="https://arxiv.org/abs/2605.14786">Known By Their Actions</a> accepted to NeurIPS.</p></li>
              <li><time dateTime="2026-08">Aug 2026</time><p><a href="https://arxiv.org/abs/2602.09924">LLMs Encode Their Failures</a> accepted to COLM.</p></li>
              <li><time dateTime="2026-08-03">3 Aug 2026</time><p>Joined Thomson Reuters as a Research Scientist Intern.</p></li>
              <li><time dateTime="2026-07">Jul 2026</time><p>Launched <a href="https://pidge.watch">Pidge</a> for finding and following Oxford opportunities.</p></li>
            </ul>
          </section>
        </main>

        <footer id="contact">Building something cool? <a href="mailto:william.lugoloobi@oii.ox.ac.uk">I'd love to hear from you</a>.</footer>
        <span id="portrait-status" className="sr-only" role="status"></span>
        <dialog className="portrait-dialog" aria-labelledby="game-title" aria-describedby="game-instructions">
          <div className="game-header">
            <div><span className="game-eyebrow">A small side quest</span><h2 id="game-title">GPU quest</h2></div>
            <form method="dialog"><button className="game-close" aria-label="Close game">×</button></form>
          </div>
          <div className="game-hud" aria-label="Score">
            <span>GPUs <strong id="gpu-count">00</strong></span>
            <span><strong id="game-distance">0</strong> m</span>
            <span>Best <strong id="game-best">00</strong></span>
          </div>
          <div className="game-screen">
            <canvas id="gpu-game" width="480" height="272" aria-label="Pixel William runs along a path. Jump over holes and angry deadline clocks, double jump in midair, and collect green GPUs.">This game needs a browser with canvas support.</canvas>
            <div className="game-overlay" id="game-overlay">
              <span className="game-badge" id="game-badge">OXFORD · COMPUTE HUNT</span>
              <h3 id="game-message">Just one more GPU.</h3>
              <p id="game-detail">Collect compute. Dodge deadlines.<br />Tap again in the air to double jump.</p>
              <button id="game-start" className="game-primary" autoFocus>Let’s go →</button>
            </div>
          </div>
          <div className="game-controls">
            <button id="game-jump" className="game-primary" disabled>Jump <span aria-hidden="true">↑</span></button>
            <button id="game-pause" disabled>Pause</button>
          </div>
          <p id="game-instructions" className="game-instructions">Tap / Space / ↑ to jump · Again in midair to double jump</p>
          <p className="game-footnote">All GPUs ethically foraged. No grants were harmed.</p>
          <span id="game-status" className="sr-only" role="status"></span>
        </dialog>
      <Honeypot />
      <AcademicInteractions />
    </div>
  );
}
