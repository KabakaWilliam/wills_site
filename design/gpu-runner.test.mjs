import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, step, jump, FLOOR, PLAYER_X } from '../public/gpu-runner-core.mjs';

function seededRandom(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

test('walking collects ground GPUs, then falls into a hole', () => {
  const run = createRun(() => .5);
  for (let i = 0; i < 600 && !run.over; i++) step(run, 1 / 60);
  assert.equal(run.over, true);
  assert.equal(run.score, 4);
  const distance = run.distance;
  step(run, 1 / 60);
  assert.equal(run.distance, distance, 'finished runs stop updating');
});

test('a second jump boosts you, a third does not, and landing recharges both', () => {
  const run = createRun();
  jump(run);
  step(run, 1 / 60);
  for (let i = 0; i < 15; i++) step(run, 1 / 60);
  const velocity = run.vy;
  jump(run);
  step(run, 1 / 60);
  assert.ok(run.vy < velocity, 'second jump gives a fresh upward impulse');
  assert.equal(run.jumpsUsed, 2);
  assert.ok(run.spark, 'double jump creates a small green spark');
  const secondVelocity = run.vy;
  jump(run);
  step(run, 1 / 60);
  assert.ok(run.vy > secondVelocity, 'third jump cannot restart the impulse');
  for (let i = 0; i < 90; i++) step(run, 1 / 60);
  assert.equal(run.y, FLOOR);
  assert.equal(run.grounded, true);
  assert.equal(run.jumpsUsed, 0);
});

test('random holes and deadlines can be cleared at starting and maximum speed', () => {
  let encounters = 0;
  for (let seed = 1; seed <= 20; seed++) {
    const run = createRun(seededRandom(seed));
    // Five minutes per seed exercises changing speed and thousands of gaps.
    for (let i = 0; i < 18000 && !run.over; i++) {
      const next = run.holes.find(hole => hole.x + hole.width > run.distance + PLAYER_X);
      const enemy = run.deadlines.find(enemy => enemy.active && enemy.x > run.distance + PLAYER_X);
      if (run.grounded && enemy && enemy.x - run.distance - PLAYER_X < 90) {
        jump(run);
        encounters++;
      } else if (next && run.grounded && next.x - run.distance - PLAYER_X < 30) jump(run);
      step(run, 1 / 60);
    }
    assert.equal(run.over, false, 'seed ' + seed);
    assert.equal(run.speed, 195);
    assert.ok(run.score > 100);
    assert.ok(run.holes.length < 6, 'old terrain is discarded');
    assert.ok(run.gpus.length < 24, 'old items are discarded');
    assert.ok(run.deadlines.length < 3, 'old deadlines are discarded');
  }
  assert.ok(encounters > 100, 'actually exercises deadline encounters');
});

test('deadlines have a warm-up and a solid runway clear of holes', () => {
  const run = createRun(() => .5);
  step(run, 1 / 60);
  const deadline = run.deadlines[0];
  assert.ok(deadline.startAt > 1000, 'learn the first two holes before any deadlines');
  assert.equal(deadline.active, false);
  run.distance = deadline.startAt - PLAYER_X;
  step(run, 1 / 60);
  assert.equal(deadline.active, true);
  const playerX = run.distance + PLAYER_X;
  assert.ok(deadline.x - playerX > 400, 'clock starts offscreen with reaction time');
  assert.ok(!run.holes.some(hole => hole.x < playerX + 600
    && hole.x + hole.width > playerX), 'solid ground throughout the encounter and landing');
});

test('clock contact ends the run with its own reason; jumping avoids contact', () => {
  const grounded = createRun();
  grounded.deadlines.push({ active: true, x: PLAYER_X + 10, minX: 0 });
  step(grounded, 1 / 60);
  assert.equal(grounded.cause, 'deadline');
  assert.equal(grounded.over, true);
  const airborne = createRun();
  airborne.grounded = false;
  airborne.y = FLOOR - 60;
  airborne.deadlines.push({ active: true, x: PLAYER_X + 10, minX: 0 });
  step(airborne, 1 / 60);
  assert.equal(airborne.over, false);
});

test('double jump cannot resurrect a player already deep in a hole', () => {
  const run = createRun();
  run.grounded = false;
  run.coyote = 0;
  run.y = FLOOR + 20;
  run.vy = 120;
  jump(run);
  step(run, 1 / 60);
  assert.ok(run.vy > 120);
});

test('a new run resets progress and a stalled frame is bounded', () => {
  const run = createRun();
  step(run, 10);
  assert.ok(run.distance < 5);
  const fresh = createRun();
  assert.equal(fresh.score, 0);
  assert.equal(fresh.distance, 0);
  assert.equal(fresh.over, false);
});
