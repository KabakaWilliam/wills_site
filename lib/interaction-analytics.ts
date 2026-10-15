import { track } from "@vercel/analytics";
import { createInteractionTracker } from "./interaction-events.mjs";

export const trackInteraction = createInteractionTracker(
  (name: string, properties: Record<string, string | number | boolean>) => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") {
      console.info("[interactions]", name, properties);
      return;
    }
    // Local production smoke tests must not inflate live interaction counts.
    if (["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) return;
    // The current site is on Hobby: don't send unsupported custom events.
    // Enable only after a compatible analytics backend/plan is configured.
    if (process.env.NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS !== "true") return;
    track(name, properties);
  },
  () => typeof navigator === "undefined" || navigator.doNotTrack === "1"
    || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true,
);
