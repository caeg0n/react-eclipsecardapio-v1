# Repository Guidelines

## Project Structure
- Root is a static site: `index.html`, `styles.css`, `script.js`, and `menu-data.js` (menu data source).
- Admin editor lives in `admin/` with its own `index.html`, `admin.js`, and `admin.css`.
- Cart/checkout view lives in `compras/` with `index.html`, `compras.js`, and `compras.css`.
- Images and previews are in the repo root (`og-image.png`, `preview-*.png`, `reference-page-*.png`).

## Build, Test, and Development Commands
- No build step. This is a static site.
- Local preview (simple static server):
  - `python -m http.server` then open `http://localhost:8000/`.
- Deploy to GitHub Pages:
  - `deploy.bat` (Windows). Creates/updates the repo, pushes `main`, and configures Pages.

## Coding Style & Naming Conventions
- Vanilla HTML/CSS/JS; no framework.
- Indentation uses 2 spaces in JS/CSS. Keep double quotes in JS consistent with existing files.
- Prefer small, pure functions and avoid shared global state where possible.
- Data lives in `menu-data.js` as `window.MENU_DATA`; keep it valid JS (not JSON-only).

## Testing Guidelines
- No automated test framework or test directory.
- Manual verification is expected:
  - Load `/` and `/compras/` pages and verify menu rendering and cart behavior.
  - If editing admin, verify it can read/write `menu-data.js` and refresh cache busting.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative messages (e.g., "Deploy cardapio web", "Add /compras cart UI...").
- Keep commit messages under 72 characters and start with a verb.
- PRs should include a brief summary, linked issue if applicable, and screenshots for UI changes.

## Security & Configuration Tips
- Do not commit raw tokens. Admin token encryption uses `admin/encrypt-token.mjs` and embeds a blob in `admin/admin.js`.
- Keep secrets in `.secrets/` (already ignored) and avoid leaking them in screenshots.
