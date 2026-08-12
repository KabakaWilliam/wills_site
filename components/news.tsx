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
              <article className="news-item">
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
