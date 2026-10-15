import type { ReactElement } from "react";

export interface MeasuremysiteProps {
  /** The site's public key (pk_...), from the dashboard's Setup tab. Defaults to NEXT_PUBLIC_MEASUREMYSITE_KEY. Safe to commit. */
  siteKey?: string;
  /** Tracker host, for self-hosted installs. Defaults to https://a.measuremy.site. */
  host?: string;
  /** Also track pages served by `next dev`. Off by default, so local visits don't count. */
  dev?: boolean;
}

/** Put it once in the root layout (App Router) or in _app (Pages Router). */
export function Measuremysite(props?: MeasuremysiteProps): ReactElement | null;
export default Measuremysite;

/** Sends a custom event, e.g. track("signup") or track("purchase", { plan: "pro" }). */
export function track(name: string, props?: Record<string, string | number | boolean>): void;
