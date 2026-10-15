# next-measuremysite

[measuremy.site](https://measuremy.site) for Next.js: cookieless web analytics your AI agent can read.

```sh
npm install next-measuremysite
```

Add the component once, with your site's public key (the `pk_...` key from the dashboard's Setup tab; it's public and safe to commit).

**App Router** (`app/layout.tsx`):

```tsx
import { Measuremysite } from "next-measuremysite";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Measuremysite siteKey="pk_..." />
      </body>
    </html>
  );
}
```

**Pages Router** (`pages/_app.tsx`):

```tsx
import type { AppProps } from "next/app";
import { Measuremysite } from "next-measuremysite";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Measuremysite siteKey="pk_..." />
    </>
  );
}
```

Or leave out `siteKey` and set `NEXT_PUBLIC_MEASUREMYSITE_KEY` in your environment.

Client-side navigation (`<Link>`, `router.push`) is counted as pageviews. `next dev` leaves the tracker out so local visits don't count (`dev` turns it on).

Props: `siteKey`, `host` (a self-hosted tracker, default `https://a.measuremy.site`), `dev`.

## Custom events

```tsx
<button data-measuremysite-event="signup">Sign up</button>
```

or from code, after a successful action:

```tsx
import { track } from "next-measuremysite";

track("signup");
track("purchase", { plan: "pro" });
```

## Read your traffic from your coding agent

Connect the measuremy.site MCP server and ask Claude Code, Cursor or Codex about visits, sources and pages:

```sh
claude mcp add --transport http measuremysite https://a.measuremy.site/mcp
```

No key needed; it signs in with OAuth. More at [measuremy.site/docs/mcp](https://measuremy.site/docs/mcp).

MIT licensed.
