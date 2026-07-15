# 🎨 Pridge Color Palette

<div align="center">

### Pridge Blue, plus a curated Persian jewel-tone palette.

</div>

The [Pridge landing page](https://sayehava.github.io/Pridge/) is themed entirely from one file: [`docs/assets/css/colors.css`](docs/assets/css/colors.css). Every other stylesheet reads color tokens from there, so re-theming the site is a one-file edit.

---

## Primary colors

| Swatch | Name | Token | Hex | Used for |
|---|---|---|---|---|
| ![#22D3EE](https://img.shields.io/badge/-22D3EE?style=for-the-badge&color=22D3EE) | **Pridge Blue** | `--pridge-blue` | `#22D3EE` | Primary brand accent, links, focus states |
| ![#1C39BB](https://img.shields.io/badge/-1C39BB?style=for-the-badge&color=1C39BB) | **Persian Blue** | `--persian-blue` | `#1C39BB` | Deep accent, primary buttons, glows |
| ![#CC3333](https://img.shields.io/badge/-CC3333?style=for-the-badge&color=CC3333) | **Persian Red** | `--persian-red` | `#CC3333` | Errors, failed job states |
| ![#00A693](https://img.shields.io/badge/-00A693?style=for-the-badge&color=00A693) | **Persian Green** | `--persian-green` | `#00A693` | Success, printed job states |
| ![#FFB300](https://img.shields.io/badge/-FFB300?style=for-the-badge&color=FFB300) | **Amber** | `--amber` | `#FFB300` | Pending states, secondary CTAs |

## Supporting shades

Additional tonal shades pulled from the same Persian color families, used for gradients, glows and hero copy:

| Swatch | Name | Token | Hex |
|---|---|---|---|
| ![#2387FF](https://img.shields.io/badge/-2387FF?style=flat-square&color=2387FF) | Pridge Blue Deep | `--pridge-blue-deep` | `#2387FF` |
| ![#0067A5](https://img.shields.io/badge/-0067A5?style=flat-square&color=0067A5) | Persian Blue Deep | `--persian-blue-deep` | `#0067A5` |
| ![#BCD4E6](https://img.shields.io/badge/-BCD4E6?style=flat-square&color=BCD4E6) | Persian Blue Pale | `--persian-blue-pale` | `#BCD4E6` |
| ![#317873](https://img.shields.io/badge/-317873?style=flat-square&color=317873) | Persian Green Deep | `--persian-green-deep` | `#317873` |
| ![#F38400](https://img.shields.io/badge/-F38400?style=flat-square&color=F38400) | Amber Deep | `--amber-deep` | `#F38400` |

## Dark neutrals

| Swatch | Name | Token | Hex |
|---|---|---|---|
| ![#05060C](https://img.shields.io/badge/-05060C?style=flat-square&color=05060C) | Background | `--bg` | `#05060C` |
| ![#111420](https://img.shields.io/badge/-111420?style=flat-square&color=111420) | Panel | `--panel-solid` | `#111420` |
| ![#EEF1FB](https://img.shields.io/badge/-EEF1FB?style=flat-square&color=EEF1FB) | Text | `--text` | `#EEF1FB` |
| ![#98A2C6](https://img.shields.io/badge/-98A2C6?style=flat-square&color=98A2C6) | Muted text | `--muted` | `#98A2C6` |

The site stays dark-mode only; these neutrals never change with the brand palette above.

---

## Sources

This palette is inspired by two references for classic "Persian color" naming:

- [alijsh/persian-colors](https://github.com/alijsh/persian-colors/blob/master/persian-colors.css) — Persian Blue, Persian Green and Persian Red were taken from this scale's `vivid` / `strong` / `brilliant-bluish` entries.
- [color-hex.com/color-palette/372](https://www.color-hex.com/color-palette/372) — additional Persian palette reference.

## File

All tokens live in [`docs/assets/css/colors.css`](docs/assets/css/colors.css). To re-theme the site, edit the values there — `docs/assets/css/pridge.css` only ever reads the semantic aliases (`--blue`, `--green`, `--orange`, `--red`, …) defined at the bottom of that file.
