# GitHub Pages Deployment

The site is served from the repository root and deployed by `.github/workflows/pages.yml`.

## Enable Pages

1. Open **Settings → Pages** in `sayehava/Pridge`.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Push the `main` branch.
4. The workflow publishes `https://sayehava.github.io/Pridge/`.

All images, CSS and JavaScript are external files under `assets/`; the HTML contains no Base64 image payloads and no inline stylesheet.
