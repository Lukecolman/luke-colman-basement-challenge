# Lucas Colman x Basement - Frontend Challenge

Blog responsive construido con Next.js, TypeScript, Tailwind CSS, Motion, GSAP y Sanity.

![Challenge 2026](public/images/OG.webp)

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev
```

Crear `.env.local` a partir de `.env.example` y configurar los valores del proyecto de Sanity y la URL local del sitio.

URL de producción: [luke-colman-basement-challenge.vercel.app](https://luke-colman-basement-challenge.vercel.app)

## Verificación

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm run build
```

El proyecto se validó mediante lint, typecheck, builds de producción, navegación manual con teclado y auditorías de Lighthouse.

## Features implementadas

- Layout responsive.
- Listado de artículos, páginas de detalle, categorías y filtrado.
- Posts, categorías, autores, labels, SEO, logo y social image editables desde Sanity.
- Metadata global y específica por artículo, sitemap, robots e imágenes optimizadas.
- Sanity Studio disponible en `/studio`.
- Navegación accesible con teclado, skip link, estados de foco, menú mobile, focus trap y Escape.
- Interacciones con Motion y GSAP que respetan la preferencia de reduced motion del usuario.
- Fallbacks locales para settings esenciales si Sanity no está disponible.

### Arquitectura de contenido en Sanity

```text
Sanity
├── Posts          contenido, Portable Text, imágenes, categorías, SEO
├── Categorías     títulos, slugs, descripciones
├── Autores        nombres e información de perfil
└── Site settings  navegación, labels, SEO, logo, social image, footer
```

## Decisiones técnicas

- Server Components por defecto; Client Components limitados a la interacción.
- Tailwind CSS se utiliza para estilos y design tokens compartidos.
- Motion y GSAP se utilizan para interacciones sutiles, con la lógica de animaciones aislada en componentes específicos.
- El acceso a datos de Sanity, los schemas de contenido y los helpers de imágenes están centralizados en `src/sanity`.
- Componentes reutilizables de UI, layout, blog y motion para mantener una estructura modular.
- Los datos de Sanity utilizan la caché del servidor de Next.js, con una ventana de revalidación de 60 segundos.
- La social image local está guardada como WebP para mantener un tamaño de archivo bajo. Las imágenes de contenido se solicitan a Sanity con el tamaño necesario para cada componente y se renderizan con `next/image`.

### Estructura de carpetas

```text
src/
├── app/         rutas, layouts, metadata, sitemap y robots
├── components/  componentes reutilizables de UI, layout, blog y motion
├── sanity/      cliente, queries GROQ, schemas y helpers de imágenes
├── types/       tipos compartidos de posts, categorías, autores e imágenes
└── styles/      estilos globales y design tokens
public/          assets locales utilizados como fallback
```

## Trade-offs y caveats

- Los settings esenciales tienen fallback local para que un problema de Sanity no rompa páginas técnicas.
- El contenido puede permanecer en caché hasta 60 segundos antes de volver a consultar Sanity; a futuro, podría integrarse un webhook seguro de Sanity para invalidar la caché on-demand al publicar contenido.
- Durante el setup inicial de Vercel, el lockfile de pnpm requirió una pequeña corrección para que el build de producción pudiera ejecutarse correctamente.

## Auditoría de Lighthouse

Auditoría realizada en una ventana de incógnito sin extensiones del navegador, sobre el sitio de producción.

| Página | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Blog | 100 | 100 | 100 | 92 |
| Artículo | 99 | 98 | 100 | 92 |

### Blog

![Auditoría de Lighthouse del blog](public/assets/lighthouse/lighthouse-blog.png)

### Artículo

![Auditoría de Lighthouse de un artículo](public/assets/lighthouse/lighthouse-article.png)
