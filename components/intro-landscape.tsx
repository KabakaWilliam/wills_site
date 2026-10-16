"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { drawMeadow, meadowStems, oxfordScene } from "@/lib/intro-landscape.mjs";
import { trackInteraction } from "@/lib/interaction-analytics";
import { mountMeadowBrush } from "@/lib/meadow-brush.mjs";

type Mode = "auto" | "day" | "night";

export function IntroLandscape({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLButtonElement>(null);
  const elapsed = useRef(0);
  const readingId = useId();
  const [scenery, setScenery] = useState(false);
  const [mode, setMode] = useState<Mode>("auto");
  const [clockScene, setClockScene] = useState<"day" | "night">("day");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const scene = mode === "auto" ? clockScene : mode;

  useEffect(() => {
    const update = () => setClockScene(oxfordScene());
    update();
    const timer = window.setInterval(update, 60_000);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const element = sceneRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !element || !ctx) return;
    let frame = 0, lastTime = 0;
    let visible = false;
    let stems: ReturnType<typeof meadowStems> = [];
    // Read the preference directly too: don't animate before the state effect runs.
    const motionReduced = reduced || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => drawMeadow(ctx, canvas.width, canvas.height, elapsed.current, scene, stems);
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!lastTime) lastTime = now;
      const dt = now - lastTime;
      if (dt >= 50) {
        elapsed.current += Math.min(dt / 1000, .1);
        lastTime = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      const playing = !paused && !motionReduced && visible && !document.hidden;
      canvas.dataset.motion = playing ? "running" : "still";
      if (playing) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width / 2));
      canvas.height = Math.max(1, Math.round(bounds.height / 2));
      stems = meadowStems(canvas.width, canvas.height);
      draw();
    };
    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .01 });
    resize();
    sizeObserver.observe(element);
    visibilityObserver.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [scene, paused, reduced]);

  useEffect(() => {
    const element = sceneRef.current;
    const reading = element?.querySelector<HTMLElement>(".intro-reading");
    if (!element || !reading || scenery || paused || reduced) return;
    return mountMeadowBrush(element, reading);
  }, [scenery, paused, reduced]);

  const sceneLabel = mode === "auto" ? "Oxford · " + scene : (scene === "day" ? "Day" : "Night") + " preview";
  const changeScenery = (next: boolean) => {
    setScenery(next);
    trackInteraction(next ? "scenery_revealed" : "scenery_restored", { scene });
  };

  return (
    <div className="intro-landscape" ref={sceneRef} data-scene={scene} data-scenery={scenery}
      onClick={event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = event.target;
        if (!(target instanceof Element) || target.closest("a, button, input, select, textarea, [role='button'], [contenteditable], .landscape-controls")) return;
        // Selecting or copying the introduction should never hide it.
        if (window.getSelection()?.isCollapsed === false) return;
        changeScenery(!scenery);
        // Keep Escape and the existing keyboard-operable toggle available.
        revealRef.current?.focus({ preventScroll: true });
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && scenery) {
          event.preventDefault();
          changeScenery(false);
        }
      }}>
      <canvas className="intro-landscape-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="intro-reading" id={readingId} inert={scenery} aria-hidden={scenery}>{children}</div>
      <button className="landscape-reveal" ref={revealRef} type="button" aria-label="Scenery view"
        aria-pressed={scenery} aria-controls={readingId}
        title={scenery ? "Show introduction (or press Escape)" : "Take a moment in the meadow"}
        onClick={() => changeScenery(!scenery)}>
        <span className="landscape-return" aria-hidden="true">↩ Back to introduction</span>
      </button>
      <div className="landscape-controls" aria-label="Landscape controls">
        <button type="button" aria-label={"Scene: " + sceneLabel + ". Change scene"}
          title="Cycle through Oxford time, daytime, and nighttime"
          onClick={() => {
            const next = mode === "auto" ? "day" : mode === "day" ? "night" : "auto";
            setMode(next);
            trackInteraction("scenery_mode_changed", { mode: next });
          }}>
          <span aria-hidden="true">{scene === "day" ? "☀" : "☾"}</span> {sceneLabel}
        </button>
        <span className="landscape-divider" aria-hidden="true">·</span>
        <button type="button" disabled={reduced} aria-pressed={paused || reduced}
          onClick={() => {
            setPaused(!paused);
            trackInteraction("scenery_motion_changed", { paused: !paused });
          }}>
          {reduced ? "Motion reduced" : paused ? "Play breeze" : "Pause breeze"}
        </button>
      </div>
    </div>
  );
}
