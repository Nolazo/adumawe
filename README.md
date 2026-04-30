# Adumawe Landing Page - Framework Modular

Este proyecto está estructurado para ser fácilmente replicable y modificable. Cada sección es un componente independiente.

## Estructura de Archivos

```
adumawe/
├── index.html          # Página principal (ensambla todos los componentes)
├── README.md           # Este archivo
│
├── css/
│   ├── styles.css      # Estilos base + utilitarios (colors, grids, buttons, forms)
│   └── components.css # Estilos específicos de cada sección
│
├── js/
│   └── main.js        # JavaScript interactivo
│
├── partials/
│   ├── header.html    # Encabezado y navegación
│   ├── hero.html     # Sección hero principal
│   ├── stats.html   # Estadísticas
│   ├── about.html   # Sobre nosotros
│   ├── mission-vision.html  # Misión y visión
│   ├── team.html    # Equipo de trabajo
│   ├── courses.html  # Cursos y programas
│   ├── quality.html # Política de calidad
│   ├── contact.html # Formulario de contacto
│   └── footer.html  # Pie de página
│
└── assets/           # Imágenes, iconos, etc. (vacío por ahora)
```

## Cómo Usar

### 1. Incluir un Componente (Server-side)

Si usas un servidor (Node.js, PHP, Python), puedes incluir los partials así:

```php
<!-- PHP -->
<?php include 'partials/header.html'; ?>
```

```html
<!-- HTML simple (sin server) -->
<!-- Copiar el contenido del partial directamente -->
```

### 2. Personalizar Colores

Los colores están definidos en `css/styles.css`:

```css
:root {
    /* Colores Primarios */
    --primary-1: #1A3F7A;
    --primary-2: #2A6B4E;
    
    /* Colores Secundarios */
    --secondary-1: #1B2A4A;
    --secondary-2: #F5F7FB;
    
    /* Colores de Resalte */
    --accent-1: #E8A020;
    --accent-2: #4A5568;
}
```

Cambia los valores hexadecimales para ajustar el tema.

### 3. Modificar Contenido

Cada partial tiene el contenido HTML. Simplemente edita el texto entre las etiquetas:

- **Textos**: Edita directamente en los archivos `partials/*.html`
- **Imágenes**: Agrega en `assets/` y actualiza la ruta en el HTML
- **Links**: Actualiza los `href` en `header.html` y `footer.html`

### 4. Agregar Nueva Sección

1. Crea `partials/nueva-seccion.html`
2. Agrega estilos en `css/components.css` (o usa utilitarios de `styles.css`)
3. Incluye en `index.html` donde quieras que aparezca:

```html
<!--#include file="partials/nueva-seccion.html"-->
```

### 5. Agregar Nuevo Miembro al Equipo

Edita `partials/team.html` y agrega otro `team-card`:

```html
<div class="team-card card">
    <div class="team-image avatar avatar--lg">IN</div>
    <div class="team-info">
        <h3>Nombre Apellido</h3>
        <div class="team-role text-accent">Cargo</div>
        <p class="team-description">Descripción...</p>
    </div>
</div>
```

### 6. Agregar Nuevo Curso

Edita `partials/courses.html` y agrega otro `course-card`:

```html
<div class="course-card card">
    <div class="course-icon icon icon--lg icon--gradient">📚</div>
    <h3>Área Nueva</h3>
    <ul class="list-arrow">
        <li>Curso 1</li>
        <li>Curso 2</li>
    </ul>
</div>
```

## Utilitaires Disponibles

### Clases de Grid
- `.grid` - Contenedor grid
- `.grid-2` - 2 columnas
- `.grid-3` - 3 columnas
- `.grid-4` - 4 columnas

### Clases de Flexbox
- `.flex` - Display flex
- `.flex-center` - Centrar contenido
- `.flex-between` - Distribuir espacio
- `.flex-column` - Dirección vertical
- `.flex-wrap` - Wrap enabled

### Clases de Color
- `.text-primary`, `.text-secondary`, `.text-accent`, `.text-muted`, `.text-white`
- `.bg-primary`, `.bg-secondary`, `.bg-accent`, `.bg-light`, `.bg-white`

### Clases de Botones
- `.btn` - Botón base
- `.btn--primary` - Botón acento (amarillo)
- `.btn--secondary` - Botón outline blanco
- `.btn--outline` - Botón outline oscuro
- `.btn--small`, `.btn--large` - Tamaños

### Componentes Reutilizables
- `.card` - Tarjeta básica
- `.card--glass` - Tarjeta con efecto vidrio
- `.icon`, `.icon--sm`, `.icon--md`, `.icon--lg` - Iconos
- `.badge` - Etiquetas
- `.avatar` - Avatares
- `.logo` - Logo con icono
- `.list-check`, `.list-arrow`, `.list-dot` - Listas estilizadas
- `.form-group`, `.form-control` - Elementos de formulario

## Responsive

El framework es 100% responsive. Las clases de grid automáticamente pasan a 1 columna en móvil.

Breakpoints:
- `1024px` - Tablet landscape
- `768px` - Tablet portrait / Móvil landscape
- `480px` - Móvil

## JavaScript (main.js)

El archivo `js/main.js` incluye:

- Smooth scroll para navegación
- Efecto visual en header al hacer scroll
- Menú hamburguesa para móvil
- Manejo del formulario de contacto
- Animaciones al hacer scroll (Intersection Observer)
- Lazy loading para imágenes

No necesitas modificarlo a menos que quieras agregar funcionalidad.

## Deploy

Para producción:

1. Minifica los CSS: `css/styles.css` + `css/components.css` → `styles.min.css`
2. Minifica el JS: `js/main.js` → `js/main.min.js`
3. Actualiza las referencias en `index.html`
4. Sube todo a tu servidor

## Créditos

- Coloresbase proporcionados por el cliente
- Contenido basado en presentación de Adumawe Ltda.
- Framework creado con/utilitarios propios