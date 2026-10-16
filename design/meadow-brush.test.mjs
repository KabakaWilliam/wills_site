import test from 'node:test';
import assert from 'node:assert/strict';
import { MAX_MEADOW_DUST, MAX_SAND_GAPS, mountMeadowBrush } from '../lib/meadow-brush.mjs';

function setup() {
  class Surface extends EventTarget {
    dataset = {};
    values = new Map();
    reads = 0;
    focused = false;
    children = [];
    attributes = new Map();
    classList = { add() {} };
    setAttribute(k, v) { this.attributes.set(k, v); }
    appendChild(child) { this.children.push(child); child.parent = this; }
    remove() { this.parent.children = this.parent.children.filter(child => child !== this); }
    style = { setProperty: (k, v) => this.values.set(k, v), removeProperty: k => this.values.delete(k) };
    getBoundingClientRect() { this.reads++; return this.bounds; }
    matches() { return this.focused; }
    closest() { return this.link || null; }
  }
  const element = new Surface(), reading = new Surface();
  element.bounds = { left: 100, top: 200, width: 768, height: 500 };
  reading.bounds = { left: 132, top: 236, width: 704, height: 300 };
  const media = new EventTarget(); media.matches = true;
  const frames = new Map(); let id = 0, time = 0, disconnected = false;
  const env = Object.assign(new EventTarget(), {
    matchMedia: () => media,
    CSS: { supports: () => true },
    document: Object.assign(new EventTarget(), { hidden: false, createElement: () => new Surface(), createElementNS: () => new Surface() }),
    requestAnimationFrame: cb => { frames.set(++id, cb); return id; },
    cancelAnimationFrame: n => frames.delete(n),
    ResizeObserver: class { observe() {} disconnect() { disconnected = true; } },
  });
  const cleanup = mountMeadowBrush(element, reading, env);
  const move = (props = {}) => element.dispatchEvent(Object.assign(new Event('pointermove'), {
    pointerType: 'mouse', clientX: 300, clientY: 400, buttons: 0, ...props,
  }));
  const step = () => {
    time += 16;
    const pending = [...frames.values()]; frames.clear();
    pending.forEach(cb => cb(time));
  };
  const settle = () => {
    let count = 0;
    while (frames.size && count++ < 100) {
      step();
    }
    assert.equal(frames.size, 0, 'animation must stop when settled');
    return count;
  };
  return { element, reading, media, frames, env, cleanup, move, step, settle, disconnected: () => disconnected };
}

test('coalesces pointer events, caches geometry, aligns text mask, and stops at rest', () => {
  const h = setup();
  for (let i = 0; i < 100; i++) h.move();
  assert.equal(h.frames.size, 1);
  assert.equal(h.element.reads, 1);
  assert.equal(h.reading.reads, 1);
  const defs = h.element.children[0].children[0];
  assert.equal(defs.children[2].children[1].attributes.get('transform'), 'translate(-32 -36)');
  assert.equal(defs.children[1].attributes.get('width'), '768');
  assert.equal(defs.children[2].attributes.get('height'), '300');
  assert.ok(h.settle() < 60);
  assert.equal(h.element.dataset.brushing, undefined, 'stationary cursor restores all text without pointerleave');
  h.move();
  assert.equal(h.frames.size, 0, 'identical coordinates do not restart the effect');
  h.element.dispatchEvent(new Event('pointerleave'));
  assert.ok(h.settle() < 60);
  assert.equal(h.element.dataset.brushing, undefined);
  h.cleanup();
});

test('ignores touch, reduced-motion/coarse-pointer preferences, and hidden tabs', () => {
  const h = setup();
  h.move({pointerType: 'touch'}); assert.equal(h.frames.size, 0);
  h.media.matches = false; h.move(); assert.equal(h.frames.size, 0);
  h.media.matches = true; h.env.document.hidden = true; h.move(); assert.equal(h.frames.size, 0);
  h.cleanup();
});

test('links, selection, and focused controls restore the reading surface', () => {
  const h = setup();
  h.move(); h.settle(); h.element.link = true; h.move();
  assert.equal(h.element.dataset.brushing, undefined);
  h.element.link = false; h.move(); h.settle(); h.move({ buttons: 1 });
  assert.equal(h.element.dataset.brushing, undefined);
  h.reading.focused = true; h.move(); assert.equal(h.frames.size, 0);
  h.cleanup();
});

test('sparkles resume when the scenery toggle retains focus after returning to text', () => {
  const h = setup();
  h.element.focused = true;
  h.element.dispatchEvent(new Event('focusin'));
  h.move(); h.step();
  assert.equal(h.element.dataset.brushing, 'true');
  const particles = h.element.children[1].children;
  assert.ok(particles.some(node => Number(node.style.opacity) > 0));
  h.settle();
  h.move({clientX: 340}); h.step();
  assert.equal(h.element.dataset.brushing, 'true');
  h.cleanup();
});

test('scroll invalidates geometry; hiding and cleanup cancel pending frames', () => {
  const h = setup();
  h.move(); h.env.dispatchEvent(new Event('scroll'));
  assert.equal(h.frames.size, 0);
  h.move(); assert.equal(h.element.reads, 2);
  h.env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(h.frames.size, 0);
  h.move(); h.cleanup();
  assert.equal(h.frames.size, 0);
  assert.equal(h.element.values.size, 0);
  assert.equal(h.reading.values.size, 0);
  assert.ok(h.disconnected());
  assert.equal(h.element.children.length, 0);
  h.move(); assert.equal(h.frames.size, 0, 'listeners removed on unmount');
});

test('dust drifts, stays capped during continuous movement, and disappears at rest', () => {
  const h = setup();
  h.move(); h.step();
  const layer = h.element.children[1];
  assert.equal(layer.children.length, MAX_MEADOW_DUST);
  const speck = layer.children[0];
  const before = speck.style.transform;
  for (let i = 0; i < 4; i++) h.step();
  assert.notEqual(speck.style.transform, before, 'flecks move without further mouse events');
  for (let i = 0; i < 500; i++) {
    h.move({ clientX: 300 + i % 150, clientY: 400 + i % 60 });
    h.step();
  }
  assert.equal(h.element.children.length, 2);
  assert.equal(layer.children.length, MAX_MEADOW_DUST);
  assert.ok(h.settle() < 60);
  assert.ok(layer.children.every(node => Number(node.style.opacity || 0) === 0));
  h.cleanup();
  assert.equal(h.element.children.length, 0);
});

test('gaps are tiny, stay on the travelled path, and refill completely without leaving', () => {
  const h = setup();
  h.move(); h.step();
  const gaps = h.element.children[0].children[0].children[0].children;
  assert.equal(gaps.length, MAX_SAND_GAPS);
  const first = gaps[0];
  const origin = [first.attributes.get('x'), first.attributes.get('y')];
  const opacity = Number(first.attributes.get('opacity'));
  for (let i = 0; i < 8; i++) h.step();
  h.move({clientX: 370}); h.step();
  assert.deepEqual([first.attributes.get('x'), first.attributes.get('y')], origin);
  assert.ok(Number(first.attributes.get('opacity')) <= opacity);
  assert.ok(gaps.filter(g => Number(g.attributes.get('opacity')) > 0).length > 18);
  assert.ok(gaps.every(g => !g.attributes.has('width') || Number(g.attributes.get('width')) <= 7));
  h.settle();
  assert.ok(gaps.every(g => Number(g.attributes.get('opacity')) === 0));
  assert.equal(h.element.dataset.brushing, undefined);
  h.cleanup();
});
