import test from 'node:test';
import assert from 'node:assert/strict';
import { goatCounterEvents, createGoatCounterTransport, redactGoatCounter } from '../lib/goatcounter-events.mjs';

test('SDK redaction removes query strings, referrers, and screen dimensions', () => {
  const counter = redactGoatCounter({ get_data: event => ({ p: event.path, e: true,
    q: '?email=private', s: 1440, r: 'https://private.example', ns: true }) });
  assert.deepEqual(counter.get_data({ path: 'gpu_game_opened' }), {
    p: 'gpu_game_opened', e: true, r: '', ns: true,
  });
});

test('fixed event names count starts and replays without sending numeric or personal data', () => {
  assert.deepEqual(goatCounterEvents('gpu_game_started', { replay: true }).map(e => e.path),
    ['gpu_game_started', 'gpu_game_replayed']);
  const [event] = goatCounterEvents('gpu_game_finished', { score: 99, seconds: 84, email: 'private' });
  assert.deepEqual(event, { path: 'gpu_game_finished', title: 'GPU quest run finished',
    event: true, no_session: true, referrer: '' });
  assert.deepEqual(goatCounterEvents('private'), []);
  assert.deepEqual(goatCounterEvents('scenery_mode_changed', { mode: 'private' }), []);
});

test('scene controls map to separate, readable dashboard entries', () => {
  for (const mode of ['auto', 'day', 'night']) {
    assert.equal(goatCounterEvents('scenery_mode_changed', { mode })[0].path, 'scenery_mode_' + mode);
  }
  assert.equal(goatCounterEvents('scenery_motion_changed', { paused: true })[0].path, 'scenery_paused');
  assert.equal(goatCounterEvents('scenery_motion_changed', { paused: false })[0].path, 'scenery_resumed');
});

test('early interactions wait for one script load and each gets counted once', async () => {
  const events = [];
  let loaded = 0, release;
  const ready = new Promise(resolve => { release = resolve; });
  const send = createGoatCounterTransport(() => { loaded++; return ready; });
  const requests = [send('gpu_game_opened'), send('gpu_game_started'), send('scenery_revealed')];
  release({ count: event => events.push(event), filter: () => false });
  await Promise.all(requests);
  assert.equal(loaded, 1);
  assert.deepEqual(events.map(e => e.path), ['gpu_game_opened', 'gpu_game_started', 'scenery_revealed']);
});

test('opt-out before or during loading prevents counting', async () => {
  let optedOut = true, loaded = 0, release;
  const ready = new Promise(resolve => { release = resolve; });
  const send = createGoatCounterTransport(() => { loaded++; return ready; }, () => optedOut);
  await send('gpu_game_opened');
  assert.equal(loaded, 0);
  optedOut = false;
  const pending = send('gpu_game_opened');
  optedOut = true;
  release({ count: () => assert.fail('must not send') });
  await pending;
});

test('blocked script, filtered visitor, or transport failure is harmless', async () => {
  await createGoatCounterTransport(() => null)('gpu_game_opened');
  await createGoatCounterTransport(() => { throw Error('blocked'); })('gpu_game_opened');
  await createGoatCounterTransport(() => ({ filter: () => 'local', count: () => assert.fail() }))('gpu_game_opened');
  await createGoatCounterTransport(() => ({ count: () => { throw Error('offline'); } }))('gpu_game_opened');
});

test('pending interaction queue is bounded', async () => {
  let release, count = 0;
  const ready = new Promise(resolve => { release = resolve; });
  const send = createGoatCounterTransport(() => ready);
  const requests = Array.from({ length: 30 }, () => send('gpu_game_opened'));
  release({ count: () => count++ });
  await Promise.all(requests);
  assert.equal(count, 20);
});
