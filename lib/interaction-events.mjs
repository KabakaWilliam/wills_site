// Only these aggregate interactions and fields may leave the browser.
const schema = {
  gpu_game_opened: {},
  gpu_game_started: { replay: 'boolean' },
  gpu_game_finished: { score: 'number', seconds: 'number' },
  gpu_game_abandoned: { score: 'number', seconds: 'number' },
  scenery_revealed: { scene: ['day', 'night'] },
  scenery_restored: { scene: ['day', 'night'] },
  scenery_mode_changed: { mode: ['auto', 'day', 'night'] },
  scenery_motion_changed: { paused: 'boolean' },
};

export function createInteractionTracker(send, optedOut = () => false) {
  return (name, properties = {}) => {
    try {
      if (!Object.hasOwn(schema, name) || optedOut()) return;
      const safe = {};
      for (const [key, rule] of Object.entries(schema[name])) {
        const value = properties[key];
        if (Array.isArray(rule) ? rule.includes(value) : typeof value === rule) {
          if (rule === 'number' && (!Number.isFinite(value) || value < 0)) continue;
          safe[key] = rule === 'number' ? Math.min(100000, Math.round(value)) : value;
        }
      }
      send(name, safe);
    } catch { /* Analytics must never interrupt the site or game. */ }
  };
}
