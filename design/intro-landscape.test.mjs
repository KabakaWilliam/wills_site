import test from 'node:test';
import assert from 'node:assert/strict';
import { oxfordScene, meadowStems, meadowCows, drawMeadow } from '../lib/intro-landscape.mjs';

test('Oxford clock uses London time, including daylight saving', () => {
  assert.equal(oxfordScene(new Date('2026-01-15T06:59:00Z')), 'night');
  assert.equal(oxfordScene(new Date('2026-01-15T07:00:00Z')), 'day');
  assert.equal(oxfordScene(new Date('2026-01-15T19:00:00Z')), 'night');
  assert.equal(oxfordScene(new Date('2026-07-15T06:00:00Z')), 'day');
  assert.equal(oxfordScene(new Date('2026-07-15T18:00:00Z')), 'night');
});

test('meadow layout is deterministic and scales with width', () => {
  const stems = meadowStems(384, 250);
  assert.deepEqual(stems, meadowStems(384, 250));
  assert.equal(stems.length, Math.round(384 * 1.45));
  assert.equal(new Set(stems.map(stem => stem.layer)).size, 3);
  assert.ok(meadowStems(160, 400).length < stems.length);
  for (const stem of stems) {
    assert.ok(stem.length > 0);
    assert.ok(Number.isFinite(stem.phase));
  }
});

function render(width, height, time, scene) {
  const pixels = [];
  const ctx = {
    fillStyle: '', imageSmoothingEnabled: true,
    fillRect(x, y, w, h) {
      assert.ok([x, y, w, h].every(Number.isInteger));
      assert.ok(w > 0 && h > 0);
      pixels.push([x, y, w, h, this.fillStyle]);
    },
  };
  drawMeadow(ctx, width, height, time, scene, meadowStems(width, height));
  assert.equal(ctx.imageSmoothingEnabled, false);
  return pixels;
}

test('day and night render at desktop and mobile sizes', () => {
  for (const [width, height] of [[384, 250], [160, 430]]) {
    const day = render(width, height, 0, 'day');
    const night = render(width, height, 0, 'night');
    assert.ok(day.length > 1000);
    assert.notDeepEqual(day, night);
    assert.deepEqual(day, render(width, height, 0, 'day'));
    assert.notDeepEqual(day, render(width, height, 10, 'day'));
  }
});

test('cows wander within separate patches below the copy, including on mobile', () => {
  for (const width of [160, 195, 384]) {
    for (let time = 0; time < 300; time += .5) {
      const cows = meadowCows(width, 250, time, 'day');
      for (const cow of cows) {
        assert.equal(cow.sleeping, false);
        assert.ok(cow.x - 16 >= 0 && cow.x + 16 < width);
        assert.ok(cow.y - 18 > 250 - 80);
      }
      assert.ok(cows[1].x - cows[0].x > 32);
    }
  }
  assert.notDeepEqual(meadowCows(384, 250, 0, 'day'), meadowCows(384, 250, 10, 'day'));
});

test('night cows stay tucked in while their pixel dreams float', () => {
  const start = meadowCows(384, 250, 0, 'night');
  const later = meadowCows(384, 250, 2, 'night');
  start.forEach((cow, index) => {
    assert.equal(cow.sleeping, true);
    assert.equal(cow.x, later[index].x);
    assert.equal(cow.y, later[index].y);
    assert.notEqual(cow.dream, later[index].dream);
  });
});
