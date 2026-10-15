# Interaction analytics

Status: event hooks are implemented and verified locally, but production custom
events are disabled because the site uses Vercel Hobby. Existing page views are
unaffected. No live interaction dashboard is connected yet.

The prepared transport uses the site's existing `@vercel/analytics` integration. In Vercel, open this
project → Analytics → Events. Web Analytics must be enabled, and custom events
require Pro or Enterprise: https://vercel.com/docs/analytics/custom-events.
No plan changes or new services are made by this code.

If the site later has a compatible Vercel plan, set
`NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS=true` and rebuild/redeploy. For the current free
plan, GoatCounter is a free hosted alternative with event support:
https://www.goatcounter.com/ and https://www.goatcounter.com/help/events.
Connecting that alternative still needs an account/site code and a transport
adapter; it is not activated by the Vercel setting above.

| Event | Meaning | Properties |
| --- | --- | --- |
| `gpu_game_opened` | Visitor opens the portrait game | None |
| `gpu_game_started` | A new run begins (not a pause/resume) | `replay` |
| `gpu_game_finished` | A run ends in a hole or deadline collision | `score`, active `seconds` |
| `gpu_game_abandoned` | An unfinished run is closed or the component unmounts | `score`, active `seconds` |
| `scenery_revealed` | Visitor hides the introduction to see the meadow | `scene` |
| `scenery_restored` | Visitor brings the introduction back, including Escape | `scene` |
| `scenery_mode_changed` | Visitor selects auto/day/night | `mode` |
| `scenery_motion_changed` | Visitor pauses or resumes the scene | `paused` |

Use opens vs starts to distinguish discovery from actually playing, and the
replay property to see whether people return for another run. These are action
counts, not unique-person counts. Closing a browser tab is not reliably recorded
as abandonment. Automatic day/night changes, scroll visibility, individual jumps,
and animation frames do not send events.

The custom payload contains no names, emails, identifiers, URLs, or precise
timestamps. No extra cookies or storage are introduced. Custom events respect
Do Not Track and Global Privacy Control. Existing Vercel page-view analytics are
unchanged; this is not a claim that all platform metadata is removed.

Development logs `[interactions]` messages without sending custom events. Local
production smoke tests are also excluded. Tests inject a fake transport; never
generate synthetic interactions on production just to check reporting.

Run `node --test design/*.test.mjs` and `npm run build -- --webpack` before release.
