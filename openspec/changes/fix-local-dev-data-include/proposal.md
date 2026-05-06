# Proposal: Fix Local Development Data-Include Processing

## Intent

El servidor de desarrollo local Vite (`npm run dev`) NO está procesando los atributos `data-include` del `index.html`. Esto provoca que el sitio se vea VACÍO en local (solo muestra el HTML base sin incluir los partials). El entorno de producción (GitHub Pages) SÍ funciona porque `build.js` procesa los includes antes de que Vite empaquete.

## Scope

### In Scope
- Configurar Vite para que procese `data-include` en desarrollo local
- Mantener la compatibilidad con el build de producción (GitHub Pages)
- Asegurar que los cambios en los partials se reflejen automáticamente (HMR - Hot Module Replacement)

### Out of Scope
- Cambiar la arquitectura de `build.js` (se mantiene para producción)
- Migrar a otro sistema de templates (se mantiene `data-include`)

## Capabilities

### New Capabilities
- `local-dev-data-include`: Procesamiento de `data-include` en tiempo real durante desarrollo local con Vite

### Modified Capabilities
- `build-process`: El proceso de build actual (build.js + Vite) se mantiene para producción

## Approach

1. **Investigar**: Cómo hace Vite para transformar HTML en desarrollo
2. **Crear un plugin de Vite**: Que intercepte las peticiones a `index.html` y procese los `data-include` antes de servir el HTML
3. **Configurar el plugin**: Solo se ejecuta en desarrollo local (no en build de producción)
4. **Verificar**: Que el sitio se vea completo en `http://localhost:3000/`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `vite.config.js` | Modify | Agregar plugin para procesar `data-include` en desarrollo |
| `index.html` (raíz) | No change | Se mantiene con `data-include` (Vite lo procesa via plugin) |
| `build.js` | No change | Se mantiene para producción |
| `dist/index.html` | No change | Se genera con `build.js` para producción |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| El plugin rompe el build de producción | Low | Solo se ejecuta en desarrollo (`isDev`) |
| Conflictos con HMR de Vite | Medium | Probar que los cambios en partials se reflejen automáticamente |
| Rendimiento lento en desarrollo | Low | El procesamiento es simple (replace de strings) |

## Rollback Plan

Si el plugin falla:
1. Revertir cambios en `vite.config.js`: `git checkout vite.config.js`
2. Usar el flujo anterior: Ejecutar `node build.js` manualmente antes de `npm run dev`

## Dependencies

- Vite 8.0.10 (ya instalado)
- Node.js (ya instalado)
- Acceso a `build.js` (para leer la lógica de procesamiento de `data-include`)

## Success Criteria

- [ ] El sitio se ve COMPLETO en `http://localhost:3000/` (con todos los partials incluidos)
- [ ] Los cambios en `partials/*.html` se reflejan automáticamente (HMR)
- [ ] El build de producción sigue funcionando: `npx vite build` genera `dist/` correctamente
- [ ] No hay errores en la consola del navegador
- [ ] El sitio en GitHub Pages sigue funcionando: https://nolazo.github.io/adumawe/
