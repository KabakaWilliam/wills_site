"use client";

import { FadeIn } from "@/components/fade-in";

export function ContactSection() {
  return (
    <section id="contact" className="contact-band">
      <div className="container">
        <div className="contact-band-inner">
          <FadeIn>
            <p>Interested in reliable agents, post-training, or collaborations?</p>
          </FadeIn>
          <div className="contact-inline-links">
            <span>william.lugoloobi [at] oii.ox.ac.uk</span>
            <a href="https://www.linkedin.com/in/wlugoloobi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="/cv" target="_blank">CV ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
