# Pridge Button Effects

18 dependency-free CSS button effects, originally designed by Sayeh, adapted here to the [Pridge color palette](../../COLORS.md) and made touch/tap friendly. Live demo: [demo.html](demo.html) (open it directly in a browser - it isn't part of the published site).

Everything lives in [`buttons.css`](buttons.css): a shared `.fx-btn` base plus one class per effect (`.fx-reflection`, `.fx-neon`, …). Load `docs/assets/css/colors.css` first, then `buttons.css`, then use `class="fx-btn fx-<name>"` on a `<button>` or `<a>`.

## The 18 effects

| # | Class | Name | What it does | Idle motion? |
|---|---|---|---|---|
| 01 | `fx-reflection` | Reflection Sweep | A glossy highlight sweeps across on a loop; hover/tap lifts the button | Yes |
| 02 | `fx-neon` | Neon Pulse | Idle glow border, solid color fill on hover/tap | Yes |
| 03 | `fx-shift` | Gradient Shift | Continuous color flow through the background | Yes |
| 04 | `fx-runner` | Border Runner | A spinning conic-gradient ring around the button | Yes |
| 05 | `fx-liquid` | Liquid Fill | A wave rises to fill the button on hover/tap | No |
| 06 | `fx-magnetic` | Magnetic Lift | The button rises with a glowing shadow underneath | No |
| 07 | `fx-split` | Split Reveal | Two panels slide apart to reveal a solid color | No |
| 08 | `fx-scan` | Scanner Line | An idle HUD-style scanning line with a subtle texture | Yes |
| 09 | `fx-glitch` | Pixel Glitch | A hover/tap-only distortion shake | No |
| 10 | `fx-ripple` | Ripple Rings | A signal/broadcast pulse on hover/tap | No |
| 11 | `fx-stars` | Data Sparkles | A dotted grid that brightens and drifts on hover/tap | No |
| 12 | `fx-corners` | Corner Brackets | A minimal frame-only style, brackets pull outward on hover/tap | No |
| 13 | `fx-glass` | Glass Prism | Glassmorphism with a slow rotating tint behind it | Yes |
| 14 | `fx-charge` | Energy Charge | A left-to-right power fill on hover/tap | No |
| 15 | `fx-swap` | Text Swap | The label swaps to a secondary action on hover/tap | No |
| 16 | `fx-orb` | Status Orb | A live-connection dot built into the button | Yes (dot only) |
| 17 | `fx-arrow` | Arrow Launch | The arrow slides forward with a burst behind it | No |
| 18 | `fx-holo` | Holographic | A shifting multi-tone sheen with a 3D tilt on hover/tap | Yes |

**Idle motion** means the effect animates all the time, not just on hover/tap. Good for a single hero accent button; avoid using more than one or two idle effects on the same screen at once, it gets busy fast.

## Used live

**Ripple Rings (`fx-ripple`)** is adapted into the real site button (`docs/assets/css/pridge.css`'s `.button`) - it fit best: no idle motion (calm at rest), it echoes the site's connect/broadcast story, and it's built from a plain border fade + scale, so there's no risk of the rotation/clipping bugs the earlier ring and dot-expand attempts ran into. The live version keeps the button's own blue gradient and adds the ring pulse in amber (blue-cobalt on the amber CTA button, for contrast).

The other 17 are a reference library for future components (secondary CTAs, status indicators, a dashboard-style page, etc.) - not wired into the live site.

## Color mapping

The original design used its own `--blue`, `--blue-2`, `--cyan`, `--green`, `--orange`, `--red` tokens. Here they read from [`colors.css`](../../docs/assets/css/colors.css) instead:

| Original role | Now uses |
|---|---|
| `--blue` | `--persian-blue` |
| `--blue-2` / `--cyan` | `--pridge-blue` |
| `--green` | `--persian-green` / `--persian-green-vivid` |
| `--orange` | `--amber` / `--amber-deep` |
| `--red` | `--persian-red` |

No effect ever needed a purple, pink or magenta tone, so none of that curation work was necessary here - the mapping was a straight swap.

## Touch/tap support

Every effect's `:hover` trigger has a matching `:active`, so tapping on a touch device shows the same feedback a mouse hover would (the `.fx-btn` base also sets `touch-action: manipulation` and clears the mobile tap-highlight flash). `prefers-reduced-motion: reduce` collapses every animation and transition to effectively instant, same as the rest of the site.
