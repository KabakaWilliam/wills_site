"use client";

import { FadeIn } from "@/components/fade-in";
import { ProfilePixel } from "@/components/profile-links";

export function ContactSection() {
  return (
    <section id="contact" className="contact-band">
      <div className="container">
        <div className="contact-band-inner">
          <FadeIn>
            <p>Interested in reliable agents, post-training, or collaborations?</p>
          </FadeIn>
          <div className="contact-inline-links">
            <span className="profile-contact"><ProfilePixel name="email" />william.lugoloobi [at] oii.ox.ac.uk</span>
            <a className="profile-contact" href="https://www.linkedin.com/in/wlugoloobi/" target="_blank" rel="noreferrer"><ProfilePixel name="linkedin" />LinkedIn ↗</a>
            <a href="/cv" target="_blank">CV ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
