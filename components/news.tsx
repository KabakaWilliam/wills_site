"use client";

import { FadeIn } from "@/components/fade-in";
import { news } from "@/lib/site-content";

export function News() {
  return (
    <section id="news" className="section news-section">
      <div className="container">
        <div className="section-heading-row">
          <p className="section-label">News</p>
          <span className="section-aside">Recent work &amp; updates</span>
        </div>
        <div className="news-list">
          {news.map((item) => (
            <FadeIn key={`${item.date}-${item.title}`}>
              <a className="news-item" href={item.href} target="_blank" rel="noreferrer">
                <time>{item.date}</time>
                <p><strong>{item.title}</strong> <span>{item.body}</span></p>
                <i aria-hidden="true">↗</i>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
