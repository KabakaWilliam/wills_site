# Interaction analytics

Production interactions use https://willgitta.goatcounter.com/ (sign in to view
the dashboard). Vercel page views are unchanged. No paid Vercel features or API
keys are needed; `NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS` is no longer used.

The official `https://gc.zgo.at/count.js` loads on the first interaction with
`no_onload` and `no_events`: no automatic page views or click listeners. Up to 20
early actions wait in memory for loading, with a 10-second timeout. Blocking or
failing analytics never prevents using the site.

| Dashboard event | Meaning |
| --- | --- |
| `gpu_game_opened` | Visitor opens the portrait game |
| `gpu_game_started` | Any new run, including replays; not pause/resume |
| `gpu_game_replayed` | Subset of starts: repeat runs during this page visit |
| `gpu_game_finished` | A run ends in a hole or deadline collision |
| `gpu_game_abandoned` | An unfinished run is closed or the component unmounts |
| `scenery_revealed` | Visitor hides the introduction to see the meadow |
| `scenery_restored` | Visitor restores the introduction, including Escape |
| `scenery_mode_auto/day/night` | Visitor selects that scene mode |
| `scenery_paused/resumed` | Visitor pauses or resumes the meadow |

Use opens vs starts to distinguish discovery from actually playing, and the
replay count to see whether people return for another run. Replays are already
included in starts: do not add the counts. `no_session: true` counts actions,
not unique people. Closing a browser tab is not reliably recorded
as abandonment. Automatic day/night changes, scroll visibility, individual jumps,
and animation frames do not send events.

GoatCounter does not support arbitrary properties. Individual scores/durations
are deliberately not sent or encoded into paths: this is engagement counting,
not a score or duration distribution.

No names, emails, persistent visitor IDs, or precise timestamps are added to
custom payloads. Query strings, referrers, and screen width are removed from the
SDK payload. Do Not Track and Global Privacy Control suppress loading and
counting, including queued events. No new application cookies or persistent
storage are introduced. The provider still receives ordinary request metadata,
such as IP/user-agent; existing Vercel analytics are unchanged.

Development logs `[interactions]` messages without sending custom events. Local
production smoke tests and Vercel previews are also excluded. Tests inject a fake transport; never
generate synthetic interactions on production just to check reporting.

Run `node --test design/*.test.mjs` and `npm run build -- --webpack` before release.

After deployment, real interactions should appear in the dashboard. Ad blockers,
privacy preferences, and offline navigation can reduce counts; these are
best-effort engagement measurements, not an audit log.

Reference: https://www.goatcounter.com/help/js and https://www.goatcounter.com/help/events.
