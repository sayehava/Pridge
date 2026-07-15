# Pridge design language

A working reference for everything visual across the Pridge ecosystem: this site's own components, plus notes on how [Pridge-Client](https://github.com/sayehava/Pridge-Client) and [Pridge-Server](https://github.com/sayehava/Pridge-Server) are designed.

The public, all-in-one overview is **[docs/design.html](https://sayehava.github.io/Pridge/design.html)** (linked from the site footer) - colors, all 18 buttons, live site elements, and the Client/Server cross-reference, all on one page. Everything else in this folder is the working notes behind that page, not published itself.

## In this folder

- **[buttons/BUTTONS.md](buttons/BUTTONS.md)** - notes on all 18 CSS button effects, palette-matched and touch-friendly. The actual CSS is `docs/assets/css/buttons.css` (it has to live under `docs/` to be usable on the published page).
- **[elements/](elements/NOTES.md)** - a catalog of this site's other reusable UI pieces (cards, badges, modals, the docs shell, …).
- **[client/](client/NOTES.md)** - design notes on Pridge Client's desktop UI (layout, theming system, components). Its accent colors are cross-referenced in the site palette under `--client-*` names (quartz, onyx, moonstone, …).
- **[server/](server/NOTES.md)** - design notes on Pridge Server's admin UI (layout, typography, spacing conventions). Its colors are **not** cross-referenced yet - it still uses the site's pre-redesign palette and will be updated to match [COLORS.md](../COLORS.md) as a separate task.

## Color palette

The color palette itself stays at the repo root: [`COLORS.md`](../COLORS.md), backed by [`docs/assets/css/colors.css`](../docs/assets/css/colors.css). Nothing here duplicates it - `client/NOTES.md` and `elements/NOTES.md` just point back to it.
