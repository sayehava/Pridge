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

All of these are re-skinned with our own palette and shown live on [docs/design.html](https://sayehava.github.io/Pridge/design.html#client).

- **Status card**: a small bordered card with an uppercase label + a value line (`.status-card-label` / `.status-card-value`) - a clean pattern for compact status displays.
- **Gradient text title**: `.sidebar-title` uses the same `linear-gradient` + `background-clip: text` trick the docs site's `h1` and stat numbers use.
- **Theme picker** (`.stone-options` / `.stone-option` / `.stone-swatch`): the actual gemstone-theme selector UI - a swatch + label grid with a ring-highlighted selected state. Directly ties to the `--client-*` tokens in the site palette.
- **Server item card** (`.server-item`): a connection-profile card (name, URL, meta badges, action buttons), with pagination (`.server-pagination`) for long lists.
- **Mapping row** (`.mapping-row` / `.mapping-active`): an endpoint-to-printer row with a highlighted active state.
- **Settings row** (`.setting-row` / `.setting-copy`): a label + description + control list item, used throughout `settings.html`.
- **Connection result** (`.success-result` / `.error-result`): a small inline alert for pass/fail feedback after testing a connection.
- **Confirm modal** (`.confirm-modal`): a branded confirmation dialog (icon + copy + actions), used instead of a native browser confirm.
- **Badge** (`.badge` / `.badge-active`): a simple pill for counts and short labels.
