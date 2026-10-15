// Adds the measuremy.site script tag with next/script. The tracker reads its key from its own <script> element (next/script
// passes data-* attributes through), and counts client-side navigation itself by listening to history.pushState, which
// both the App Router and the Pages Router use. Plain createElement, no JSX, so the package ships without a build step.
import { createElement } from "react";
// next has no "exports" map, so Node's ESM resolver (used when Next leaves this package external, as the Pages Router does)
// needs the file extension.
import Script from "next/script.js";

const DEFAULT_HOST = "https://a.measuremy.site";

/** @param {import("./index").MeasuremysiteProps} props */
export function Measuremysite({ siteKey, host = DEFAULT_HOST, dev = false } = {}) {
  // Next inlines NEXT_PUBLIC_* at build time, so this has to be the literal expression.
  const key = siteKey ?? process.env.NEXT_PUBLIC_MEASUREMYSITE_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "development") console.warn("next-measuremysite: no site key. Pass <Measuremysite siteKey=\"pk_...\" /> or set NEXT_PUBLIC_MEASUREMYSITE_KEY. Get one at https://measuremy.site/login.");
    return null;
  }
  if (!/^pk_[A-Za-z0-9_-]+$/.test(key)) throw new Error(`next-measuremysite: "${key}" isn't a site key; it starts with pk_ (the public key from the dashboard's Setup tab).`);
  // `next dev` visits would count as real traffic, so they're left out unless asked.
  if (process.env.NODE_ENV === "development" && !dev) return null;
  return createElement(Script, {
    id: "measuremysite",
    src: `${host.replace(/\/+$/, "")}/t.js`,
    strategy: "afterInteractive",
    "data-key": key,
  });
}

/** Sends a custom event. Calls made before the tracker has loaded, or on the server, are dropped. */
export function track(name, props) {
  if (typeof window !== "undefined" && window.measuremysite) window.measuremysite.track(name, props);
}

export default Measuremysite;
