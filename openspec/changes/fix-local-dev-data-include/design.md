# Design: Local Development Data-Include Processing#

## Technical Approach

Create a **Vite plugin** that intercepts HTML requests during development and processes `data-include` attributes in real-time. The plugin will:
1. Read the requested HTML file
2. Process `data-include` attributes using the same logic as `build.js`
3. Return the processed HTML with all partials included
4. Only activate in development mode (not in production build)

## Architecture Decisions#

### Decision: Vite Plugin for Data-Include#

**Choice**: Create a custom Vite plugin (`vite-plugin-include.js`)
**Alternatives considered**: 
- Modify `build.js` to run before `npm run dev` (rejected: no HMR)
- Use Vite's `transformIndexHtml` hook (rejected: only works on `index.html` entry point)
- Use middleware with `server.middlewares` (chosen: more flexible)

**Rationale**: A Vite plugin with `configureServer` hook gives us:
- Access to the development server
- Ability to intercept ALL HTML requests (not just `index.html`)
- Real-time processing with HMR support
- Clean separation from production build

### Decision: Development-Only Activation#

**Choice**: Check `isDev` flag (same as existing `base` logic)
**Alternatives considered**:
- Always active (rejected: breaks production build)
- Check `command` mode (less reliable)

**Rationale**: Reuses existing pattern from `vite.config.js` for consistency.

## Data Flow#

```
Browser Request → Vite Dev Server → Plugin intercepts HTML request
                                      ↓
                            Read HTML file (from disk)
                                      ↓
                            Process data-include attributes
                            (use same logic as build.js)
                                      ↓
                            Return processed HTML to browser
                                      ↓
                            Browser renders COMPLETE page (with partials)
```

## File Changes#

| File | Action | Description |
|------|--------|-------------|
| `vite.config.js` | Modify | Import and register the new plugin; pass `isDev` flag |
| `vite-plugin-include.js` | Create | New Vite plugin file in project root |
| `build.js` | No change | Keep for production build (unchanged) |
| `dist/index.html` | No change | Production input (unchanged) |

## Interfaces / Contracts#

### Plugin Structure (vite-plugin-include.js)#

```javascript
export function vitePluginInclude(options = {}) {
  return {
    name: 'vite-plugin-include',
    configureServer(server) {
      // Intercept HTML requests
      server.middlewares.use((req, res, next) => {
        if (req.url.endsWith('.html') || req.url === '/') {
          // Process data-include and return modified HTML
        }
        next();
      });
    }
  };
}
```

### Reusing build.js Logic#

The plugin will import and reuse the `processIncludes` function from `build.js`:
```javascript
import { processIncludes } from './build.js'; // Need to export this function
```

## Testing Strategy#

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual Dev | Page loads with all partials | Open `http://localhost:3000/` and verify all sections visible |
| HMR | Changes in partials reflect immediately | Edit `partials/header.html` and see changes without refresh |
| Production | Build still works | Run `npx vite build` and verify output |

## Migration / Rollout#

No migration needed. The plugin only affects development mode. Production build (`build.js` + `vite build`) remains untouched.

## Open Questions#

- [ ] Should we extract `processIncludes` into a separate module (to avoid circular dependencies)?
- [ ] What happens if `build.js` is also modified? (Need to ensure plugin reads latest file from disk, not memory)
