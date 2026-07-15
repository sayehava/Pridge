# Pridge Client design language

Notes on [Pridge-Client](https://github.com/sayehava/Pridge-Client)'s UI, for cross-project design awareness. Not a copy of its code, just observations from `src/printbridge_client/webui/`.

## Stack

A desktop app (pywebview) with a plain HTML/CSS/JS front end - no framework, a small `vendor/` folder has React production builds available but the main UI (`index.html`, `settings.html`, `server.html`) is hand-rolled markup plus `styles.css` and a few `.js` files per screen.

## Layout

- Fixed-height app shell (`.app`, `height: 100vh`) with a `backdrop-filter: blur(24px) saturate(130%)` glass layer over a glowing radial-gradient background (`body::before`), similar spirit to the docs site's orbs but tighter/darker since it's a small desktop window, not a scrolling page.
- A fixed 240px `.sidebar` (nav + status card + footer) next to a scrollable content area - a settings-app layout, not a marketing-page layout like docs/.
- Small base font (13px) and tight spacing (`--gap: 14px`), because it's a compact native-feeling window, not a browser tab.

## Theming system

Six named dark themes switched via `html[data-darkness="<name>"]`, each overriding the same set of CSS variables (`--window-base`, three `--glow-*` colors, card/button/item backgrounds, `--accent` and its `-hover`/`-bright`/`-deep` shades). The default (no attribute set) is effectively "Onyx." Names read like gemstones: **Quartz, Moonstone, Labradorite, Onyx, Obsidian, Jet** - see [COLORS.md](../../COLORS.md#cross-project-accents-pridge-client) for the accent hex values, now cross-referenced in `docs/assets/css/colors.css` under `--client-*` tokens.

Two of those themes (Moonstone, Obsidian) use purple/magenta accents. That's fine for the desktop client, a separate product with its own theme picker - the docs site's own palette intentionally doesn't use those hues (see the site's own color rules), so those two tokens are reference-only here, never used in a docs/ gradient.

## Components worth reusing ideas from

- **Status card**: a small bordered card with an uppercase label + a value line (`.status-card-label` / `.status-card-value`) - a clean pattern for compact status displays, could inform a future "server status" widget on the docs site.
- **Gradient text title**: `.sidebar-title` uses the same `linear-gradient` + `background-clip: text` trick the docs site's `h1` and stat numbers use.
