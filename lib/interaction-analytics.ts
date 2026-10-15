import { createInteractionTracker } from "./interaction-events.mjs";
import { createGoatCounterTransport, redactGoatCounter } from "./goatcounter-events.mjs";

type Counter = {
  count: (event: { path: string; title: string; event: boolean; no_session: boolean; referrer: string }) => void;
  filter?: () => string | false;
  get_data: (vars: unknown) => Record<string, unknown>;
};

const optedOut = () => typeof navigator === "undefined" || navigator.doNotTrack === "1"
  || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

function loadGoatCounter(): Promise<Counter | null> {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "https://gc.zgo.at/count.js";
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.dataset.goatcounter = "https://willgitta.goatcounter.com/count";
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true, no_events: true });
    const finish = (counter: Counter | null) => {
      clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
      resolve(counter);
    };
    // Bound the early-event queue even when a blocker leaves the load pending.
    const timeout = window.setTimeout(() => finish(null), 10_000);
    script.onload = () => {
      const counter = (window as Window & { goatcounter?: Counter }).goatcounter;
      finish(counter?.count && typeof counter.get_data === "function" ? redactGoatCounter(counter) : null);
    };
    script.onerror = () => finish(null);
    document.head.appendChild(script);
  });
}

const sendToGoatCounter = createGoatCounterTransport(loadGoatCounter, optedOut);

export const trackInteraction = createInteractionTracker(
  (name: string, properties: Record<string, string | number | boolean>) => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") {
      console.info("[interactions]", name, properties);
      return;
    }
    // Local production smoke tests must not inflate live interaction counts.
    if (["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) return;
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") return;
    void sendToGoatCounter(name, properties);
  },
  optedOut,
);
