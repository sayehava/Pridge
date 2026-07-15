# Pridge site elements

A quick catalog of the docs site's own reusable UI pieces, for reference alongside the [button library](../buttons/BUTTONS.md). These live in `docs/assets/css/pridge.css` - this is a pointer index, not a copy of the CSS.

| Element | Class | Notes |
|---|---|---|
| Primary/secondary/orange buttons | `.button`, `.button-secondary`, `.button-orange` | See [buttons/BUTTONS.md](../buttons/BUTTONS.md) - the live hover effect is Ripple Rings |
| Glass panel | `.glass` | Translucent blurred panel, base for cards, the API/docs shells, the CTA card |
| Persian star motif | `.motif-tag`, `.motif-star` | Replaces a generic pill "eyebrow" badge - two overlaid squares form an 8-point star |
| Section kicker | `.kicker` | Small uppercase label above headings, now with a diamond `::before` marker |
| Architecture cards | `.arch-card`, `.arch-glow` | The 4-step "how it works" cards, each with a different palette-colored corner glow |
| Repo cards | `.repo-card`, `.repo-icon`, `.feature-list` | Server/Client/integration cards with a colored icon + checklist |
| Endpoint explorer | `.endpoint-item`, `.method`, `.code-panel` | The API browser: route list + method badges + request/response code blocks |
| Docs shell | `.docs-side`, `.doc-link`, `.doc-panel` | Sidebar-navigated documentation tabs |
| Lifecycle badges | `.life`, `.life-arrow` | Status pills (pending/reserved/printing/printed/failed) with palette-matched colors |
| Modals | `dialog`, `.modal-head`, `.modal-body` | Native `<dialog>` element, blurred backdrop |
| Toasts | `.toast-stack`, `.toast` | Bottom-right notification stack |

## Background texture

`.grid-overlay` is a diagonal (45°/-45°) Persian Blue lattice, a nod to girih tilework, replacing what was a plain graph-paper dot grid before this redesign.
