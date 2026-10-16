export const MAX_MEADOW_DUST = 24;
export const MAX_SAND_GAPS = 72;
let brushId = 0;

/** Tiny temporary gaps in the reading veil, plus a fixed pool of drifting grains. */
export function mountMeadowBrush(element, reading, env = window) {
  const pointer = env.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  if (!env.CSS.supports("mask-image", 'url("#sand")')) return;
  let frame = 0, previous = 0, lastEmit = -Infinity;
  let targetX = 0, targetY = 0, emittedX = null, emittedY = null, pending = false;
  let bounds = null, textBounds = null, offsetX = 0, offsetY = 0;
  let dustLayer = null, svg = null, textUse = null;
  let dustIndex = 0, gapIndex = 0;
  const dust = [], gaps = [], masks = [];
  const namespace = "http://www.w3.org/2000/svg";
  const id = "meadow-sand-" + ++brushId;
  const createSvg = (name, attributes = {}) => {
    const node = env.document.createElementNS(namespace, name);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
    return node;
  };
  const initialize = () => {
    if (svg) return;
    // Shared geometry feeds both masks; no canvas serialization or per-frame CSS strings.
    svg = createSvg("svg", { width: 0, height: 0, "aria-hidden": "true", focusable: "false" });
    svg.classList.add("meadow-sand-defs");
    const defs = createSvg("defs");
    const holes = createSvg("g", { id: id + "-gaps", fill: "black", "shape-rendering": "crispEdges" });
    for (let i = 0; i < MAX_SAND_GAPS; i++) {
      const node = createSvg("rect", { opacity: 0 });
      holes.appendChild(node);
      gaps.push({ node, life: 0, duration: 1 });
    }
    defs.appendChild(holes);
    for (const suffix of ["veil", "text"]) {
      const mask = createSvg("mask", { id: id + "-" + suffix, maskUnits: "userSpaceOnUse", maskContentUnits: "userSpaceOnUse", x: 0, y: 0, "mask-type": "luminance" });
      const base = createSvg("rect", { fill: "white", x: 0, y: 0 });
      const use = createSvg("use", { href: "#" + id + "-gaps" });
      if (suffix === "text") textUse = use;
      mask.appendChild(base);
      mask.appendChild(use);
      defs.appendChild(mask);
      masks.push({ mask, base });
    }
    svg.appendChild(defs);
    element.appendChild(svg);
    element.style.setProperty("--sand-veil-mask", 'url("#' + id + '-veil")');
    element.style.setProperty("--sand-text-mask", 'url("#' + id + '-text")');
    dustLayer = env.document.createElement("span");
    dustLayer.className = "meadow-dust";
    dustLayer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < MAX_MEADOW_DUST; i++) {
      const node = env.document.createElement("i");
      dustLayer.appendChild(node);
      dust.push({ node, life: 0, duration: 1, x: 0, y: 0, vx: 0, vy: 0, phase: 0 });
    }
    element.appendChild(dustLayer);
  };
  const measure = () => {
    bounds = element.getBoundingClientRect();
    textBounds = reading.getBoundingClientRect();
    offsetX = textBounds.left - bounds.left;
    offsetY = textBounds.top - bounds.top;
    initialize();
    masks.forEach(({mask, base}, i) => {
      const rect = i ? textBounds : bounds;
      for (const node of [mask, base]) {
        node.setAttribute("width", String(rect.width));
        node.setAttribute("height", String(rect.height));
      }
    });
    textUse.setAttribute("transform", "translate(" + -offsetX + " " + -offsetY + ")");
  };
  const emit = now => {
    if (!pending || now - lastEmit < 48) return;
    pending = false;
    lastEmit = now;
    const dx = emittedX === null ? 0 : Math.max(-70, Math.min(70, targetX - emittedX));
    const dy = emittedY === null ? 0 : Math.max(-70, Math.min(70, targetY - emittedY));
    emittedX = targetX;
    emittedY = targetY;
    // Independent grains, never a solid cutout. Old gaps stay on the path.
    for (let i = 0; i < 18; i++) {
      const gap = gaps[gapIndex++ % MAX_SAND_GAPS];
      const behind = Math.random();
      const size = 3 + Math.floor(Math.random() * 5);
      gap.node.setAttribute("x", String(Math.round(targetX - dx * behind + (Math.random() - .5) * 76)));
      gap.node.setAttribute("y", String(Math.round(targetY - dy * behind + (Math.random() - .5) * 54)));
      gap.node.setAttribute("width", String(size));
      gap.node.setAttribute("height", String(size));
      gap.life = gap.duration = .38 + Math.random() * .34;
    }
    for (let i = 0; i < 3; i++) {
      const particle = dust[dustIndex++ % MAX_MEADOW_DUST];
      const angle = Math.random() * Math.PI * 2;
      const spread = 8 + Math.random() * 24;
      particle.x = targetX + Math.cos(angle) * spread;
      particle.y = targetY + Math.sin(angle) * spread;
      particle.vx = Math.cos(angle) * (12 + Math.random() * 24) + dx * .2;
      particle.vy = -22 - Math.random() * 26;
      particle.phase = Math.random() * Math.PI * 2;
      particle.life = particle.duration = .5 + Math.random() * .3;
    }
    element.dataset.brushing = "true";
  };
  const drift = dt => {
    let active = false;
    for (const gap of gaps) {
      if (gap.life <= 0) continue;
      gap.life = Math.max(0, gap.life - dt);
      // Each gap fills independently, even with the cursor still inside the header.
      gap.node.setAttribute("opacity", Math.min(1, gap.life / gap.duration * 1.65).toFixed(2));
      active ||= gap.life > 0;
    }
    for (const particle of dust) {
      if (particle.life <= 0) continue;
      particle.life = Math.max(0, particle.life - dt);
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 58 * dt;
      const age = particle.duration - particle.life;
      const flutter = Math.sin(age * 10 + particle.phase) * 4;
      particle.node.style.transform = "translate(" + Math.round(particle.x + flutter) + "px, " + Math.round(particle.y) + "px)";
      particle.node.style.opacity = (Math.min(1, particle.life / particle.duration * 2) * .7).toFixed(2);
      active ||= particle.life > 0;
    }
    return active;
  };
  const reset = () => {
    env.cancelAnimationFrame(frame);
    frame = previous = 0;
    pending = false;
    bounds = null;
    lastEmit = -Infinity;
    emittedX = emittedY = null;
    for (const gap of gaps) { gap.life = 0; gap.node.setAttribute("opacity", "0"); }
    for (const particle of dust) { particle.life = 0; particle.node.style.opacity = "0"; }
    delete element.dataset.brushing;
  };
  const tick = now => {
    const dt = previous ? Math.min(now - previous, 50) : 16;
    previous = now;
    emit(now);
    const active = drift(dt / 1000);
    if (active || pending) frame = env.requestAnimationFrame(tick);
    else { frame = previous = 0; delete element.dataset.brushing; }
  };
  const schedule = () => { if (!frame) frame = env.requestAnimationFrame(tick); };
  const leave = () => { pending = false; };
  const move = event => {
    if (!pointer.matches || event.pointerType !== "mouse" || env.document.hidden) return;
    // The scenery toggle retains focus after returning to the text. Only focus
    // inside the reading content should suppress its mask, not the whole scene.
    if (event.buttons || event.target?.closest?.("a, button") || reading.matches(":focus-within")) {
      reset();
      return;
    }
    if (!bounds) measure();
    targetX = event.clientX - bounds.left;
    targetY = event.clientY - bounds.top;
    // Ignore repeated events at a stationary cursor: the sand must settle.
    if (emittedX !== null && Math.hypot(targetX - emittedX, targetY - emittedY) < 4) return;
    pending = true;
    schedule();
  };
  const observer = new env.ResizeObserver(reset);
  observer.observe(element);
  element.addEventListener("pointermove", move, { passive: true });
  element.addEventListener("pointerleave", leave);
  element.addEventListener("pointerdown", reset);
  element.addEventListener("focusin", reset);
  env.addEventListener("scroll", reset, { passive: true, capture: true });
  env.addEventListener("blur", reset);
  env.document.addEventListener("visibilitychange", reset);
  pointer.addEventListener("change", reset);
  return () => {
    reset();
    dustLayer?.remove();
    svg?.remove();
    element.style.removeProperty("--sand-veil-mask");
    element.style.removeProperty("--sand-text-mask");
    observer.disconnect();
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
    element.removeEventListener("pointerdown", reset);
    element.removeEventListener("focusin", reset);
    env.removeEventListener("scroll", reset, true);
    env.removeEventListener("blur", reset);
    env.document.removeEventListener("visibilitychange", reset);
    pointer.removeEventListener("change", reset);
  };
}
