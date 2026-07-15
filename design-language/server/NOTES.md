# Pridge Server design language

Notes on [Pridge-Server](https://github.com/sayehava/Pridge-Server)'s admin UI, for cross-project design awareness. Not a copy of its code, just observations from `assets/app.css` and `views/`.

**Colors are intentionally skipped here.** Server's admin UI currently uses the site's old pre-Persian palette (same `#05060c` background, the same cyan/purple/red/green/amber set the docs site used before this redesign). That will be brought in line with the current [Pridge palette](../../COLORS.md) later - a separate, deliberate task, not something to copy from today.

## Stack

Plain PHP server-rendered views (`views/*.php`) with one shared stylesheet (`assets/app.css`) and no JS framework - a classic MVC admin dashboard, not a SPA.

## Layout

- A sticky `.topbar` (blurred, translucent) with the brand mark, nearly identical structurally to the docs site's `.topbar` (same `backdrop-filter: blur(18px)`, same sticky-top pattern) - unsurprising since both trace back to the same original template.
- Same three-tier radius scale convention as the docs site (`--radius-lg/md/sm`: 18/12/8 here vs. the docs site's 28/20/14/10 four-tier scale) - close enough in spirit that the sites read as siblings even before the colors are unified.
- Same scrollbar-gradient trick (`::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--accent), var(--accent-2)); }`) as the docs site had before this redesign.
- Base font 16px, system font stack (`"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`) - a proper full-page site, not a compact app window like Client.

## Components worth reusing ideas from

All of these are re-skinned with our own palette and shown live on [docs/design.html](https://sayehava.github.io/Pridge/design.html#server).

- **`fadeUp` keyframe**: identical purpose to the docs site's own `fadeUp` - both fade + translateY(10-20px) on entrance. Good confirmation the two sites should keep sharing this kind of micro-interaction vocabulary once colors are unified.
- **Metric card** (`.metric`): a stat card with a big gradient-text number, hover-lift on the whole card - Server's own take on the docs site's `.stat`.
- **Status pill** (`.status-pill`): a glowing rounded pill for a single system-wide status line.
- **Notice** (`.notice`): a success-tinted callout box for post-action confirmations (e.g. "endpoint created, copy this token now").
- **Data table** (`table` / `th` / `td` / row hover): the queue, client and endpoint list pattern - header row, hoverable rows, a `.badge` per status column.
- **Pagination** (`.pagination`, `.pagination-nav`, `.pagination-size`): page-size selector plus prev/next nav, used under every table.
- Admin topbar structurally mirrors the docs site's own (see [Layout](#layout) above).
