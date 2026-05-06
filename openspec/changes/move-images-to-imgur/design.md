# Design: Move Images to Imgur CDN

## Technical Approach

Migrar todas las referencias de imágenes de rutas relativas (`assets/...`) a URLs absolutas de Imgur (`https://i.imgur.com/...`). El cambio es puramente de nivel de presentación (HTML) sin afectar la lógica de JavaScript ni los estilos CSS.

## Architecture Decisions

### Decision: Use Imgur as CDN

**Choice**: Imgur (https://i.imgur.com/)
**Alternatives considered**: GitHub Raw, Cloudinary, mantener archivos locales
**Rationale**: 
- Gratuito sin límite de ancho de banda para imágenes públicas
- No requiere registro para subir (aunque se recomienda para persistencia)
- CDN global con carga rápida
- URLs directas simples: `https://i.imgur.com/{id}.{ext}`

### Decision: Replace All Image References at Once

**Choice**: Actualizar todas las referencias en un solo commit
**Alternatives considered**: Migración gradual por secciones
**Rationale**: 
- El cambio es puramente de presentación (HTML), no hay dependencias cruzadas
- Un solo commit mantiene el historial limpio
- Fácil rollback si algo falla

### Decision: Keep Local Assets Folder

**Choice**: NO eliminar la carpeta `assets/` del repositorio
**Alternatives considered**: Eliminar `assets/` completamente
**Rationale**: 
- Las imágenes sirven como backup local
- Pueden ser útiles para desarrollo offline
- No afectan el despliegue en GitHub Pages (ya no se referencian)

## Data Flow

Before:
```
Browser → GitHub Pages → index.html → assets/image.jpg (404 - not in repo)
```

After:
```
Browser → GitHub Pages → index.html → https://i.imgur.com/xyz.jpg (loaded from Imgur CDN)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Líneas 19, 28: meta tags OG/Twitter; Líneas 47-48: hero images |
| `partials/hero.html` | Modify | Líneas 4-5: cambiar `src="assets/hero-training.jpg"` a URL de Imgur |
| `partials/about.html` | Modify | Línea 17: cambiar `src="assets/NCH-2728.png"` a URL de Imgur |
| `partials/header.html` | Modify | Línea 5: cambiar `src="assets/header-logo.svg"` a URL de Imgur |
| `partials/footer.html` | Modify | Línea 6: cambiar `src="assets/header-logo.svg"` a URL de Imgur |
| `partials/team.html` | Modify | Líneas 11, 21, 31: cambiar fotos de Pamela, Verónica y Claudio a URLs de Imgur |
| `assets/` | No change | Mantener archivos como backup (no afecta producción) |

## Interfaces / Contracts

No hay interfaces de código que modificar. El cambio es puramente de contenido HTML.

Formato de URL esperado:
```html
<!-- Antes -->
<img src="assets/image.jpg" alt="...">

<!-- Después -->
<img src="https://i.imgur.com/{imgur-id}.jpg" alt="...">
```

Meta tags:
```html
<!-- Antes -->
<meta property="og:image" content="https://www.adumawe.cl/assets/header-logo.svg">

<!-- Después -->
<meta property="og:image" content="https://i.imgur.com/{imgur-id}.svg">
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual E2E | Todas las imágenes cargan en GitHub Pages | Navegar a https://nolazo.github.io/adumawe/ y verificar en DevTools que no hay 404 en imágenes |
| Manual E2E | Meta tags funcionan | Usar Facebook Debugger y Twitter Card Validator |
| Visual | El sitio se ve idéntico | Comparar visualmente antes/después (screenshots) |

## Migration / Rollout

1. **Subir imágenes a Imgur**:
   - Ir a https://imgur.com/upload
   - Subir: hero-training.jpg, hero-training2.jpg, NCH-2728.png, Pamela-Mansilla.jpg, Veronica-Ojeda.jpg, Claudio-Velasquez.jpg, header-logo.svg, 1.jpg, 2.jpg
   - Copiar las URLs directas generadas

2. **Actualizar archivos HTML**:
   - Reemplazar todas las referencias `assets/...` con las URLs de Imgur
   - Actualizar meta tags en `index.html`

3. **Commit y push**:
   ```bash
   git add index.html partials/
   git commit -m "feat: migrate images to Imgur CDN for GitHub Pages compatibility"
   git push origin main
   ```

4. **Verificar despliegue**:
   - Esperar a que GitHub Actions termine (2-3 min)
   - Navegar a https://nolazo.github.io/adumawe/
   - Abrir DevTools → Network → verificar que todas las imágenes cargan (status 200)

## Open Questions

- [ ] ¿Las imágenes subidas sin cuenta en Imgur se eliminan después de cierto tiempo? (Investigar TOS de Imgur)
- [ ] ¿El logo SVG se renderiza correctamente desde Imgur? (Algunos CDNs no sirven SVG correctamente)
