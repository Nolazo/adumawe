# Proposal: Move Images to Imgur CDN

## Intent

Las imágenes del sitio no cargan correctamente en GitHub Pages porque los archivos `hero-training.jpg` y `hero-training2.jpg` no están commiteados en el repositorio, y otras imágenes tienen problemas de servicio. Migrar todas las imágenes a Imgur (CDN gratuito) para asegurar carga confiable y reducir el peso del repositorio.

## Scope

### In Scope
- Subir 9 imágenes a Imgur (hero-training.jpg, hero-training2.jpg, NCH-2728.png, Pamela-Mansilla.jpg, Veronica-Ojeda.jpg, Claudio-Velasquez.jpg, header-logo.svg, 1.jpg, 2.jpg)
- Actualizar referencias en 6 archivos HTML (`index.html`, `partials/about.html`, `partials/footer.html`, `partials/header.html`, `partials/hero.html`, `partials/team.html`)
- Actualizar meta tags Open Graph y Twitter Card en `index.html`
- Verificar carga correcta en GitHub Pages

### Out of Scope
- Optimización de imágenes (redimensionar/comprimir)
- Lazy loading de imágenes
- Migración de otros assets (CSS/JS)

## Capabilities

### New Capabilities
- `external-image-cdn`: Uso de CDN externo (Imgur) para servir imágenes estáticas

### Modified Capabilities
- `landing-page-assets`: Cambio de rutas locales a URLs externas para todas las imágenes

## Approach

1. **Subir imágenes a Imgur**: Usar https://imgur.com/upload para subir todas las imágenes de `assets/`
2. **Obtener URLs directas**: Copiar las URLs directas de imagen (formato: `https://i.imgur.com/XXXXXXX.jpg`)
3. **Actualizar referencias**: Reemplazar rutas relativas `assets/...` con URLs absolutas de Imgur en todos los archivos HTML
4. **Actualizar meta tags**: Cambiar URLs en Open Graph y Twitter Card a las nuevas URLs de Imgur
5. **Commit y push**: Hacer commit de los cambios y verificar despliegue en GitHub Pages

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Actualizar 4 referencias (2 img tags, 2 meta tags) |
| `partials/about.html` | Modified | Actualizar 1 referencia a imagen |
| `partials/footer.html` | Modified | Actualizar 1 referencia a logo |
| `partials/header.html` | Modified | Actualizar 1 referencia a logo |
| `partials/hero.html` | Modified | Actualizar 2 referencias a imágenes hero |
| `partials/team.html` | Modified | Actualizar 3 referencias a fotos del equipo |
| `assets/` | Deprecated | Las imágenes locales ya no se usan en producción |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Imgur borra imágenes sin cuenta | Low | Usar cuenta gratuita o hacer backup local |
| URLs de Imgur cambian | Low | Documentar IDs de Imgur en el README |
| Imgur está caído | Low | Tener fallback plan con GitHub Raw |
| Imágenes se ven diferentes | Low | Verificar formato y calidad después de subir |

## Rollback Plan

Si Imgur falla o las imágenes no cargan:
1. Revertir commit: `git revert HEAD`
2. Hacer push: `git push origin main`
3. Las imágenes volverán a usar rutas locales `assets/` (asegurar que estén commiteadas)

## Dependencies

- Cuenta de Imgur (opcional, se puede subir sin cuenta pero con riesgo de eliminación)
- Acceso a https://imgur.com/upload

## Success Criteria

- [ ] Todas las imágenes cargan correctamente en https://nolazo.github.io/adumawe/
- [ ] Meta tags Open Graph y Twitter Card usan URLs de Imgur
- [ ] No hay errores 404 en la consola del navegador
- [ ] El sitio mantiene su apariencia visual original
- [ ] Commit con los cambios subido a `main`
