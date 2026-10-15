import test from 'node:test';
import assert from 'node:assert/strict';
import { createInteractionTracker } from '../lib/interaction-events.mjs';

test('interaction events only include allowed, coarse fields', () => {
  const events = [];
  const track = createInteractionTracker((...event) => events.push(event));
  track('gpu_game_finished', { score: 7, seconds: 12.6, email: 'private', url: '/secret' });
  track('scenery_revealed', { scene: 'night', visitorId: 'private' });
  track('gpu_game_started', { replay: false });
  track('unknown_event', { anything: 'private' });
  assert.deepEqual(events, [
    ['gpu_game_finished', { score: 7, seconds: 13 }],
    ['scenery_revealed', { scene: 'night' }],
    ['gpu_game_started', { replay: false }],
  ]);
});

test('invalid values cannot leak through a valid event name', () => {
  const events = [];
  const track = createInteractionTracker((...event) => events.push(event));
  track('scenery_mode_changed', { mode: 'personal data' });
  track('gpu_game_finished', { score: Infinity, seconds: -2 });
  assert.deepEqual(events, [['scenery_mode_changed', {}], ['gpu_game_finished', {}]]);
});

test('privacy opt-out suppresses events and transport failure never breaks interactions', () => {
  const track = createInteractionTracker(() => assert.fail('must not send'), () => true);
  track('gpu_game_opened');
  assert.doesNotThrow(() => createInteractionTracker(() => { throw new Error('offline'); })('gpu_game_opened'));
});
