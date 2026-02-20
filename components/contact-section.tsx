"use client";

import { FadeIn } from "@/components/fade-in";

export function ContactSection() {
  return (
    <section id="contact" className="section" style={{ borderBottom: "none" }}>
      <div className="container">
        <p className="section-label">Contact</p>
        <div className="contact-layout">
          <div>
            <p className="contact-body">
              Contact me by email at X@Y where X=william.lugoloobi and
              Y=oii.ox.ac.uk
            </p>
          </div>
          <FadeIn>
            <div>
              <p className="sidebar-label">Links</p>
              <ul className="sidebar-list">
                <li>
                  <a href="https://github.com/KabakaWilliam" target="_blank">
                    GitHub <span className="ext">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/William__Gitta" target="_blank">
                    X / Twitter <span className="ext">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://scholar.google.com/citations?user=_lcpYZkAAAAJ&hl=en"
                    target="_blank"
                  >
                    Google Scholar <span className="ext">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/wlugoloobi/"
                    target="_blank"
                  >
                    LinkedIn <span className="ext">↗</span>
                  </a>
                </li>
                <li>
                  <a href="/William_Gitta_Lugoloobi_CV.pdf">
                    CV (PDF) <span className="ext">↓</span>
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
