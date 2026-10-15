const titles = {
  gpu_game_opened: 'GPU quest opened',
  gpu_game_started: 'GPU quest run started',
  gpu_game_replayed: 'GPU quest replay started',
  gpu_game_finished: 'GPU quest run finished',
  gpu_game_abandoned: 'GPU quest run closed early',
  scenery_revealed: 'Meadow revealed',
  scenery_restored: 'Introduction restored',
  scenery_mode_auto: 'Meadow follows Oxford time',
  scenery_mode_day: 'Meadow daytime selected',
  scenery_mode_night: 'Meadow nighttime selected',
  scenery_paused: 'Meadow animation paused',
  scenery_resumed: 'Meadow animation resumed',
};

// The official script otherwise adds the current URL query and screen width.
export function redactGoatCounter(counter) {
  const getData = counter.get_data.bind(counter);
  counter.get_data = vars => {
    const data = getData(vars);
    delete data.q;
    delete data.s;
    data.r = '';
    return data;
  };
  return counter;
}

// GoatCounter has event counts, not arbitrary event properties. Keep a small,
// fixed set of names; do not put individual scores or durations into event paths.
export function goatCounterEvents(name, properties = {}) {
  let names = [name];
  if (name === 'gpu_game_started' && properties.replay === true) names.push('gpu_game_replayed');
  if (name === 'scenery_mode_changed') names = ['scenery_mode_' + properties.mode];
  if (name === 'scenery_motion_changed') names = properties.paused === true
    ? ['scenery_paused'] : properties.paused === false ? ['scenery_resumed'] : [];
  return names.filter(key => Object.hasOwn(titles, key)).map(path => ({
    path, title: titles[path], event: true, no_session: true, referrer: '',
  }));
}

export function createGoatCounterTransport(loadCounter, optedOut = () => false) {
  let loading;
  let pending = 0;
  return async (name, properties = {}) => {
    const events = goatCounterEvents(name, properties);
    if (!events.length || optedOut() || pending >= 20) return;
    pending++;
    try {
      // A single shared load preserves early clicks without adding more scripts.
      loading ??= Promise.resolve().then(loadCounter);
      const counter = await loading;
      if (!counter || optedOut() || counter.filter?.()) return;
      for (const event of events) counter.count(event);
    } catch { /* Blocked analytics or a failed request must never affect the UI. */ }
    finally { pending--; }
  };
}
