# Basement Frontend Challenge

Production-oriented blog foundation for the Basement frontend challenge. This phase sets up the local project base only; Figma implementation, GitHub, Vercel, and reviewer access are intentionally deferred.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion
- Sanity

## Implemented foundation

- Strict TypeScript project setup
- Tailwind design-token base
- App Router routes for home, blog, blog detail, category, Studio, sitemap, and robots
- Reusable layout and UI primitives
- Accessible header, skip link, and keyboard-friendly mobile navigation
- Centralized Sanity client, image helper, and GROQ queries
- Sanity schemas for posts, categories, authors, site settings, SEO, and Portable Text
- Empty states when Sanity is not configured

## Technical decisions

- Server Components are the default for routes and content rendering.
- Client Components are limited to mobile navigation, icon buttons, embedded Studio, and Motion helpers.
- Sanity access is centralized in `src/sanity` so UI components do not contain GROQ.
- The app can render without Sanity environment variables, which keeps local setup usable before CMS provisioning.

## Trade-offs

- The current visual layer is structural only. Figma fidelity and final art direction are reserved for the design implementation phase.
- Category filtering exists as route groundwork, not the final animated query-param filter experience.
- Draft preview mode and Sanity webhooks are not implemented yet.

## Local setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and fill in the Sanity values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```
