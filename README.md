# TOPI Construction — sitio web

Maquetado del sitio de TOPI Construction. Versión 1 "clara", aprobada por Moni y Sofia el 16/09/2026.

## Qué hay acá

- `index.html` — el sitio completo, en un solo archivo.

Todo está adentro de ese archivo: el HTML, los estilos, el JavaScript, las tipografías
(Montserrat e Inter) y las fotos. No hay carpeta de imágenes ni dependencias externas, así que
se puede abrir haciendo doble clic o subir a cualquier hosting sin configurar nada.

## Marca

- Títulos, logo, menú y botones: **Montserrat** (700/800 en títulos, 600 en botones y menú),
  mayúsculas, letter-spacing de 1.5 a 2px.
- Párrafos: **Inter** Regular (400).
- Dorado de los CTA: `#FCDA9C`. Para texto dorado sobre fondo claro se usa `#8A6A1E`, porque el
  dorado original no tiene contraste suficiente y queda ilegible.
- Navy: `#171D29`, usado como color de texto y en fondos puntuales.

## Qué falta (marcado en el sitio con etiquetas doradas)

- Logo real (hoy es un wordmark tipográfico provisorio).
- Fotos reales de obras de TOPI. Las actuales son **imágenes de referencia, no son obras de la
  empresa** — hay que reemplazarlas antes de publicar en vivo, por fotos propias o stock con
  licencia comercial (Unsplash, Pexels).
- Nombres, fotos y roles del equipo.
- Reseñas reales de Google Business.
- Teléfono y dirección de contacto.
- Textos definitivos de la historia de la empresa y de los casos de estudio.

## Cómo publicarlo

En GitHub Pages: subir este repo, entrar a Settings → Pages, elegir "Deploy from a branch",
rama `main`, carpeta `/ (root)`. El sitio queda en `https://USUARIO.github.io/REPO/`.

El archivo tiene que llamarse `index.html` para que cargue solo al entrar al link.

## Cómo editarlo

Abrir la carpeta en Visual Studio Code y editar `index.html`. Para ver los cambios, guardar y
abrir el archivo en el navegador (o usar la extensión Live Server, que lo recarga solo).

Las secciones están separadas por comentarios en el código (`<!-- HERO -->`, `<!-- SERVICIOS -->`,
etc.) para encontrar rápido cada parte.
