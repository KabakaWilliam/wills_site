import { createRun, jump, step, FLOOR, PLAYER_X } from './gpu-runner-core.mjs';

/** Attach the game to a page; dispose on React unmount or preview teardown. */
export function mountGpuRunner(root, onInteraction = (_name, _properties) => {}) {
const events = new AbortController();
function report(name, properties = {}) {
  try { onInteraction(name, properties); } catch { /* Optional analytics cannot break play. */ }
}
function listen(target, type, listener) {
  target.addEventListener(type, listener, { signal: events.signal });
}

const dialog = root.querySelector('.portrait-dialog');
const portrait = root.querySelector('.portrait');
const canvas = root.querySelector('#gpu-game');
const ctx = canvas.getContext('2d');
const overlay = root.querySelector('#game-overlay');
const startButton = root.querySelector('#game-start');
const jumpButton = root.querySelector('#game-jump');
const pauseButton = root.querySelector('#game-pause');
const message = root.querySelector('#game-message');
const detail = root.querySelector('#game-detail');
const badge = root.querySelector('#game-badge');
const status = root.querySelector('#game-status');
const scoreLabel = root.querySelector('#gpu-count');
const distanceLabel = root.querySelector('#game-distance');
const bestLabel = root.querySelector('#game-best');
const footnote = root.querySelector('.game-footnote');
const defaultFootnote = footnote.textContent;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let run = createRun();
let state = 'ready';
let frame = 0;
let lastTime = 0;
let best = 0;
let runReported = true;
let starts = 0;
function reportRun(name) {
  if (runReported) return;
  runReported = true;
  report(name, { score: run.score, seconds: Math.round(run.elapsed) });
}
try { best = Math.max(0, Number(localStorage.getItem('william-gpu-quest-best')) || 0); } catch { /* Private browsing is fine. */ }

const colours = {
  H: '#242a30', S: '#885437', s: '#b4774d', G: '#1c2731',
  g: '#d5e1c1', C: '#303b40', c: '#455653', T: '#d6cda4', B: '#202b32',
};
// Original 16-bit-inspired portrait: afro, glasses, dark coat and trainers.
const william = [
  '....HHHHHH......',
  '...HHHHHHHH.....',
  '..HHHHHHHHHH....',
  '..HHSSSSSSHH....',
  '..HSSSSSSSSs....',
  '...SGGGSGGG.....',
  '...SGgGSGgGs....',
  '...SSSSSSSS.....',
  '....SSSSSs......',
  '.....SSSS.......',
  '...CCCTTCCC.....',
  '..CCCCTTCCCC....',
  '..CcCCTTCCcC....',
  '..CsCCCCCCsC....',
  '...sCCCCCCs.....',
  '....CCCCCC......',
  '....CCCCCC......',
  '....BBB.BBB.....',
  '....BBB.BBB.....',
  '....ggg.ggg.....',
];

function rect(x, y, w, h, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}
function sprite(rows, x, y, scale, palette) {
  rows.forEach((row, iy) => [...row].forEach((pixel, ix) => {
    if (palette[pixel]) rect(x + ix * scale, y + iy * scale, scale, scale, palette[pixel]);
  }));
}
function tree(x, y, scale = 1) {
  rect(x + 13 * scale, y + 26 * scale, 6 * scale, 15 * scale, '#7c8260');
  rect(x + 7 * scale, y, 18 * scale, 8 * scale, '#668f69');
  rect(x + 2 * scale, y + 8 * scale, 28 * scale, 10 * scale, '#668f69');
  rect(x, y + 18 * scale, 32 * scale, 10 * scale, '#668f69');
  rect(x + 5 * scale, y + 25 * scale, 22 * scale, 6 * scale, '#527c5b');
  rect(x + 7 * scale, y + 7 * scale, 9 * scale, 5 * scale, '#82a773');
}
function building(x) {
  rect(x, 95, 124, 45, '#d4c79a');
  rect(x - 4, 89, 132, 8, '#8c9380');
  rect(x + 13, 73, 26, 67, '#dbd0a6');
  rect(x + 10, 69, 32, 7, '#949b81');
  for (let i = 0; i < 4; i++) rect(x + 10 + i * 9, 63, 5, 7, '#b9bc97');
  rect(x + 21, 85, 10, 17, '#809185');
  rect(x + 20, 121, 12, 19, '#8c9177');
  for (let i = 0; i < 4; i++) {
    rect(x + 50 + i * 18, 104, 7, 13, '#8b9c8d');
    rect(x + 50 + i * 18, 123, 7, 12, '#8b9c8d');
  }
}
function gpu(x, y) {
  rect(x - 13, y - 8, 26, 16, '#264e46');
  rect(x - 11, y - 6, 22, 12, '#66a66a');
  rect(x - 15, y - 7, 2, 16, '#d8e1c1');
  rect(x - 7, y - 4, 8, 8, '#253f42');
  rect(x - 5, y - 2, 4, 4, '#abc7a0');
  rect(x + 4, y - 4, 5, 2, '#c3db8d');
  rect(x + 4, y + 1, 5, 2, '#c3db8d');
  for (let i = 0; i < 4; i++) rect(x - 6 + i * 4, y + 8, 2, 3, '#d4b85d');
}
function deadlineClock(enemy) {
  const x = Math.round(enemy.x - run.distance);
  const stride = reducedMotion.matches ? 0 : Math.floor(run.elapsed * 12) % 2;
  const y = FLOOR - 34;
  // Tiny running alarm clock with an unnecessarily urgent conference flag.
  rect(x + 14, y - 25, 2, 52, '#72524a');
  const flap = reducedMotion.matches ? 0 : stride * 2;
  rect(x + 16, y - 25, 68, 17, '#934a3d');
  rect(x + 80, y - 25 + flap, 5, 13, '#934a3d');
  ctx.fillStyle = '#fff6da';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('23:59 AoE', x + 19, y - 13);
  rect(x - 15, y + 2, 10, 6, '#b85b43');
  rect(x + 5, y + 2, 10, 6, '#b85b43');
  rect(x - 10, y + 8, 20, 24, '#703f38');
  rect(x - 14, y + 12, 28, 16, '#703f38');
  rect(x - 10, y + 11, 20, 17, '#f4ddb0');
  rect(x - 7, y + 14, 5, 2, '#703f38');
  rect(x + 3, y + 14, 5, 2, '#703f38');
  rect(x - 4, y + 16, 2, 3, '#342d2b');
  rect(x + 3, y + 16, 2, 3, '#342d2b');
  rect(x - 1, y + 19, 2, 5, '#b85b43');
  rect(x - 4, y + 22, 4, 2, '#b85b43');
  rect(x - 9 - stride * 2, y + 30, 4, 4, '#703f38');
  rect(x + 5 + stride * 2, y + 29, 4, 5, '#703f38');
}
function draw() {
  ctx.imageSmoothingEnabled = false;
  rect(0, 0, 480, 272, '#d4e6cc');
  const scenery = reducedMotion.matches ? 0 : run.distance;
  // Slow scenery, crisp tile edges, no flashing or camera shake.
  for (let i = 0; i < 4; i++) {
    const x = (i * 167 - scenery * .1 % 668 + 668) % 668 - 90;
    rect(x, 27 + i % 2 * 12, 58, 9, '#eef1d9');
    rect(x + 13, 20 + i % 2 * 12, 29, 8, '#eef1d9');
  }
  rect(0, 115, 480, 70, '#b9d1a4');
  for (let i = -1; i < 3; i++) building(i * 330 - scenery * .2 % 330 + 140);
  rect(0, 139, 480, 50, '#97b883');
  for (let i = -1; i < 6; i++) tree(i * 113 - scenery * .4 % 113, 110 + (i % 2) * 7);
  rect(0, 168, 480, 15, '#83a875');
  rect(0, 183, 480, 25, '#e6d6a7');
  rect(0, FLOOR, 480, 64, '#a99a71');
  rect(0, FLOOR, 480, 5, '#6b885c');
  for (let i = -1; i < 22; i++) {
    const x = i * 28 - run.distance % 28;
    rect(x, 193 + (i % 2) * 4, 5, 2, '#cfbf94');
    rect(x + 8, 223, 12, 3, '#bdac7f');
    rect(x + 20, 246, 6, 3, '#8e8968');
    rect(x + 6, 177, 2, 4, '#c1d39d');
  }
  for (const hole of run.holes) {
    const x = hole.x - run.distance;
    rect(x, 183, hole.width, 89, '#31453d');
    rect(x + 4, 188, hole.width - 8, 84, '#243730');
    rect(x - 3, 183, 3, 25, '#f2dfac');
    rect(x + hole.width, 183, 3, 25, '#f2dfac');
    rect(x, 208, 4, 48, '#7a805d');
    rect(x + hole.width - 4, 208, 4, 48, '#7a805d');
  }
  for (const item of run.gpus) {
    gpu(item.x - run.distance, item.y);
  }
  for (const enemy of run.deadlines) {
    if (enemy.active) deadlineClock(enemy);
  }
  if (run.spark && !reducedMotion.matches) {
    const spread = (1 - run.spark.life / .22) * 16;
    const x = run.spark.x - run.distance;
    for (const side of [-1, 1]) {
      rect(x + side * (6 + spread), run.spark.y - 3 + spread / 2, 4, 4, '#477d58');
      rect(x + side * (3 + spread / 2), run.spark.y + 3 + spread, 3, 3, '#81aa59');
    }
  }
  const walking = state === 'running' && run.grounded;
  const stride = walking ? Math.floor(run.elapsed * 10) % 2 : 0;
  const y = Math.round(run.y) - 40;
  if (run.y <= FLOOR) rect(PLAYER_X - 11, FLOOR - 2, 24, 3, '#b3a778');
  sprite(william.slice(0, 17), PLAYER_X - 16, y + stride, 2, colours);
  // Alternating steps keep the head readable at small sizes.
  const airborne = !run.grounded;
  rect(PLAYER_X - 8 - stride * 2, y + 34, 6, airborne ? 4 : 6, colours.B);
  rect(PLAYER_X + 2 + stride * 2, y + 34, 6, stride || airborne ? 3 : 6, colours.B);
  rect(PLAYER_X - 8 - stride * 2, y + (airborne ? 38 : 40), 8, 2, colours.g);
  rect(PLAYER_X + 2 + stride * 2, y + (stride || airborne ? 37 : 40), 8, 2, colours.g);
}

function updateHud() {
  scoreLabel.textContent = String(run.score).padStart(2, '0');
  distanceLabel.textContent = Math.floor(run.distance / 10);
  bestLabel.textContent = String(best).padStart(2, '0');
}
function setState(next) {
  state = next;
  dialog.dataset.state = next;
  overlay.hidden = next === 'running';
  jumpButton.disabled = next !== 'running';
  pauseButton.disabled = next !== 'running' && next !== 'paused';
  pauseButton.textContent = next === 'paused' ? 'Resume' : 'Pause';
}
function stopFrame() {
  cancelAnimationFrame(frame);
  frame = 0;
  lastTime = 0;
}
function tick(now) {
  if (state !== 'running' || !dialog.open) return;
  const dt = lastTime ? (now - lastTime) / 1000 : 1 / 60;
  lastTime = now;
  step(run, dt);
  draw();
  updateHud();
  if (run.over) {
    reportRun('gpu_game_finished');
    stopFrame();
    const newBest = run.score > best;
    best = Math.max(best, run.score);
    try { localStorage.setItem('william-gpu-quest-best', String(best)); } catch { /* Optional only. */ }
    updateHud();
    setState('over');
    badge.textContent = newBest ? 'NEW PERSONAL BEST' : 'EXPERIMENT COMPLETE';
    message.textContent = run.cause === 'deadline' ? 'Deadline missed.' : 'A gap in the research.';
    detail.textContent = run.score + ' GPUs collected · ' + Math.floor(run.distance / 10) + ' m explored';
    // Keep the punchline outside the canvas so it also fits on narrow phones.
    footnote.textContent = run.cause === 'deadline'
      ? 'We regret to inform you that yesterday was the deadline.' : defaultFootnote;
    startButton.textContent = 'One more run →';
    status.textContent = message.textContent + ' ' + detail.textContent
      + (run.cause === 'deadline' ? ' ' + footnote.textContent : '');
    startButton.focus({ preventScroll: true });
    return;
  }
  frame = requestAnimationFrame(tick);
}
function play() {
  if (state === 'running') return;
  if (state !== 'paused') {
    run = createRun();
    runReported = false;
    report('gpu_game_started', { replay: starts > 0 });
    starts++;
  }
  footnote.textContent = defaultFootnote;
  stopFrame();
  setState('running');
  status.textContent = 'Running. Jump over holes and deadlines. Tap again in the air to double jump.';
  jumpButton.focus({ preventScroll: true });
  frame = requestAnimationFrame(tick);
}
function pause() {
  if (state !== 'running') return;
  stopFrame();
  setState('paused');
  badge.textContent = 'TAKE YOUR TIME';
  message.textContent = 'Compute can wait.';
  detail.textContent = 'Your GPUs aren’t going anywhere.';
  startButton.textContent = 'Keep going →';
  status.textContent = 'Game paused.';
}
function doJump() {
  if (state === 'running') jump(run);
}
listen(portrait, 'click', () => {
  run = createRun();
  footnote.textContent = defaultFootnote;
  setState('ready');
  badge.textContent = 'OXFORD · COMPUTE HUNT';
  message.textContent = 'Just one more GPU.';
  detail.innerHTML = 'Collect compute. Dodge deadlines.<br>Tap again in the air to double jump.';
  startButton.textContent = 'Let’s go →';
  updateHud();
  draw();
  dialog.showModal();
  report('gpu_game_opened');
  startButton.focus({ preventScroll: true });
});
listen(startButton, 'click', play);
listen(jumpButton, 'pointerdown', event => {
  if (event.button !== 0) return;
  event.preventDefault();
  doJump();
});
// Supports assistive technology and keyboard-generated button activation.
listen(jumpButton, 'click', event => { if (event.detail === 0) doJump(); });
listen(canvas, 'pointerdown', event => {
  if (event.button === 0) { event.preventDefault(); doJump(); }
});
listen(pauseButton, 'click', () => state === 'paused' ? play() : pause());
listen(dialog, 'keydown', event => {
  if (state === 'running' && ['Space', 'ArrowUp', 'KeyW'].includes(event.code)) {
    // Space still activates the pause/close controls when they have focus.
    if (event.code === 'Space' && event.target.closest('button') && event.target !== jumpButton) return;
    event.preventDefault();
    if (!event.repeat) doJump();
  }
  if (event.code === 'KeyP' && !event.repeat) state === 'running' ? pause() : state === 'paused' ? play() : null;
});
listen(dialog, 'close', () => {
  reportRun('gpu_game_abandoned');
  stopFrame();
  setState('ready');
  root.querySelector('#portrait-status').textContent = 'Back to the research.';
  portrait.focus({ preventScroll: true });
});
listen(dialog, 'click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
listen(document, 'visibilitychange', () => { if (document.hidden) pause(); });
listen(window, 'blur', pause);
updateHud();
draw();

return () => {
  reportRun('gpu_game_abandoned');
  stopFrame();
  events.abort();
  if (dialog.open) dialog.close();
};
}
