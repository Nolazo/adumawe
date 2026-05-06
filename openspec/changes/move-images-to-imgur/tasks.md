# Tasks: Move Images to Imgur CDN

## Phase 1: Upload Images to Imgur

- [ ] 1.1 Subir `hero-training.jpg` a Imgur y copiar URL directa (https://i.imgur.com/...)
- [ ] 1.2 Subir `hero-training2.jpg` a Imgur y copiar URL directa
- [ ] 1.3 Subir `NCH-2728.png` a Imgur y copiar URL directa
- [ ] 1.4 Subir `Pamela-Mansilla.jpg` a Imgur y copiar URL directa
- [ ] 1.5 Subir `Veronica-Ojeda.jpg` a Imgur y copiar URL directa
- [ ] 1.6 Subir `Claudio-Velasquez.jpg` a Imgur y copiar URL directa
- [ ] 1.7 Subir `header-logo.svg` a Imgur y copiar URL directa
- [ ] 1.8 Subir `1.jpg` a Imgur y copiar URL directa
- [ ] 1.9 Subir `2.jpg` a Imgur y copiar URL directa
- [ ] 1.10 Documentar todas las URLs en un archivo temporal (imgur-urls.txt)

## Phase 2: Update index.html

- [ ] 2.1 Actualizar línea 19: meta property="og:image" con URL de Imgur para header-logo.svg
- [ ] 2.2 Actualizar línea 28: meta name="twitter:image" con URL de Imgur para header-logo.svg
- [ ] 2.3 Actualizar línea 47: img src="assets/hero-training.jpg" → URL de Imgur
- [ ] 2.4 Actualizar línea 48: img src="assets/hero-training2.jpg" → URL de Imgur

## Phase 3: Update Partials - Header and Footer

- [ ] 3.1 Actualizar `partials/header.html` línea 5: img src="assets/header-logo.svg" → URL de Imgur
- [ ] 3.2 Actualizar `partials/footer.html` línea 6: img src="assets/header-logo.svg" → URL de Imgur

## Phase 4: Update Partials - Content Sections

- [ ] 4.1 Actualizar `partials/hero.html` líneas 4-5: hero images → URLs de Imgur
- [ ] 4.2 Actualizar `partials/about.html` línea 17: img src="assets/NCH-2728.png" → URL de Imgur
- [ ] 4.3 Actualizar `partials/team.html` línea 11: Pamela-Mansilla.jpg → URL de Imgur
- [ ] 4.4 Actualizar `partials/team.html` línea 21: Veronica-Ojeda.jpg → URL de Imgur
- [ ] 4.5 Actualizar `partials/team.html` línea 31: Claudio-Velasquez.jpg → URL de Imgur

## Phase 5: Testing and Verification

- [ ] 5.1 Hacer commit: `git add index.html partials/ && git commit -m "feat: migrate images to Imgur CDN"`
- [ ] 5.2 Hacer push: `git push origin main`
- [ ] 5.3 Esperar a que GitHub Actions termine el despliegue (2-3 min)
- [ ] 5.4 Verificar en https://nolazo.github.io/adumawe/ que todas las imágenes cargan (F12 → Network → Images)
- [ ] 5.5 Verificar meta tags con Facebook Debugger: https://developers.facebook.com/tools/debug/
- [ ] 5.6 Verificar Twitter Card con validator: https://cards-dev.twitter.com/validator
- [ ] 5.7 Comparar visualmente que el sitio se vea idéntico al original

## Phase 6: Cleanup (Optional)

- [ ] 6.1 Actualizar README.md para documentar que las imágenes están en Imgur
- [ ] 6.2 Eliminar archivo temporal imgur-urls.txt si se creó
