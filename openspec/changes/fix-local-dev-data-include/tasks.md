# Tasks: Fix Local Development Data-Include Processing#

## Phase 1: Plugin Development#

- [ ] 1.1 Export `processIncludes` function from `build.js` (add `module.exports = { processIncludes }`)
- [ ] 1.2 Create `vite-plugin-include.js` in project root with plugin skeleton
- [ ] 1.3 Implement `configureServer` hook to intercept HTML requests
- [ ] 1.4 Reuse `processIncludes` logic to transform HTML in real-time
- [ ] 1.5 Add error handling for missing partials (return 404 with message)

## Phase 2: Vite Configuration#

- [ ] 2.1 Import the new plugin in `vite.config.js`
- [ ] 2.2 Register plugin only when `isDev` is true (using same `isDev` logic)
- [ ] 2.3 Test that plugin does NOT activate in production mode

## Phase 3: Testing - Local Development#

- [ ] 3.1 Start dev server: `npm run dev`
- [ ] 3.2 Verify `http://localhost:3000/` shows COMPLETE page (all partials included)
- [ ] 3.3 Test Hot Module Replacement: Modify `partials/header.html` → Verify changes reflect immediately
- [ ] 3.4 Check browser console for errors (should be none)

## Phase 4: Testing - Production Build#

- [ ] 4.1 Run production build: `npx vite build` (with `NODE_ENV=production`)
- [ ] 4.2 Verify `dist/index.html` is generated correctly (with `/adumawe/` base)
- [ ] 4.3 Verify CSS/JS are bundled correctly in `dist/assets/`
- [ ] 4.4 Deploy to GitHub Pages and verify live site works

## Phase 5: Cleanup (Optional)#

- [ ] 5.1 Add comments to `vite-plugin-include.js` explaining the plugin purpose
- [ ] 5.2 Update `README.md` to document the local dev setup
