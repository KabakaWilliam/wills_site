"use client";

import { useEffect } from "react";
import { mountGpuRunner } from "@/public/gpu-runner.js";
import { trackInteraction } from "@/lib/interaction-analytics";

export function AcademicInteractions() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".academic-home");
    if (!root) return;
    const disposeGame = mountGpuRunner(root, trackInteraction);
    const events = new AbortController();
    const links = [...root.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')];
    const sections = links.map(link => root.querySelector<HTMLElement>(link.hash)!);
    let frame = 0;
    function update() {
      frame = 0;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= innerHeight * .25) current = section.id;
      }
      if (current && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      for (const link of links) {
        if (link.hash === "#" + current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    for (const type of ["scroll", "resize", "hashchange"]) {
      window.addEventListener(type, schedule, { passive: true, signal: events.signal });
    }
    schedule();
    return () => {
      disposeGame();
      events.abort();
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
