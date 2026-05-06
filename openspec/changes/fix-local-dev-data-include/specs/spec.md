# Spec: Local Development Data-Include Processing

## Purpose

Define how Vite deveopment server should process `data-include` attributes in `index.html` in real-time, matching the behavior of `build.js` for production.

## Requirements

### Requirement: Real-time Data-Include Processing

The Vite development server MUST process `data-include` attributes in HTML files before serving them to the browser.

#### Scenario: Load index.html with data-include

- GIVEN the Vite dev server is running (`npm run dev`)
- WHEN the browser requests `http://localhost:3000/`
- THEN the server MUST return `index.html` with all `data-include` attributes processed
- AND the response MUST contain the actual HTML content from partial files (e.g., `partials/header.html`)
- AND the response MUST NOT contain any `<div data-include="..."></div>` tags

#### Scenario: Hot Module Replacement for partials

- GIVEN the Vite dev server is running
- WHEN a file in `partials/*.html` is modified
- THEN the browser MUST automatically reload or update to reflect the changes
- AND the updated content MUST be visible without manual page refresh

### Requirement: Production Build Compatibility

The Vite configuraiton MUST NOT break the production build process (`npx vite build`).

#### Scenario: Production build with data-include

- GIVEN the environment is set to production (`NODE_ENV=production`)
- WHEN `npx vite build` is executed
- THEN the build MUST use `dist/index.html` (already processed by `build.js`)
- AND the output in `dist/` MUST be correct (CSS/JS bundled, images optimized)
- AND the `base: '/adumawe/'` MUST be applied for GitHub Pages

### Requirement: Plugin Activation Control

The `data-include` processing plugin MUST ONLY be active during local development.

#### Scenario: Plugin disabled in production

- GIVEN the environment is set to production
- WHEN `npx vite build` is executed
- THEN the `data-include` plugin MUST NOT transform `index.html`
- AND `build.js` output (already processed) MUST be used as input

#### Scenario: Plugin active in development

- GIVEN the environment is set to development
- WHEN `npm run dev` is executed
- THEN the `data-include` plugin MUST be active
- AND all requests to `.html` files MUST be processed
