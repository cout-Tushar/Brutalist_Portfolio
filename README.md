# Tushar Mishra — Portfolio

A Next.js App Router portfolio: server-rendered editorial content, a dynamically loaded Three.js systems core, Lenis scrolling on fine pointers, and accessible interactive project explanations.

## Run

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run build`
- `npm start`

Node 22 is used for validation. No runtime environment variables or API keys are required.

## Structure

- `app/page.tsx`: server-rendered portfolio sections.
- `app/content.ts`: preserved identity, projects, skills, and interests.
- `app/components/experience.tsx`: navigation, motion, project illustrations, architecture, skills.
- `app/components/system-core.tsx`: dynamically loaded Three.js scene with cleanup and fallback.
- `app/components/hammy-install.tsx`: verified install command and clipboard action.
- `app/globals.css`: responsive visual system.
- `app/opengraph-image.tsx`: generated sharing image.
- `tests/portfolio.spec.ts`: responsive, accessibility, and interaction checks.

## Content integrity

Project illustrations contain sample data and are labeled. The architecture explorer is conceptual, not a claim about a single production topology. Original performance/concurrency claims remain preserved in content.ts but are not promoted without benchmark evidence. Coding profile URLs are unfilled and not displayed.

Hammy's README confirms `npm install -g tushar_hammy`. Original project, resume, and contact links are preserved. A 200 response from Google Drive does not by itself verify anonymous PDF access.

## Deployment

The active application is Next.js, built with `npm run build`. No production hostname is configured here; confirm the canonical domain and social-image absolute URL when deploying. The old root `index.html` is retained as a legacy snapshot because the repository alone does not establish whether another deployment still uses it. Do not edit it as an active source.

## Motion and accessibility

Native touch scrolling; optional Lenis wheel scrolling on desktop. Reduced-motion settings disable motion and WebGL. The core has a pause button and an inline CSS fallback on small screens or WebGL failure. Geometry, materials, renderer, observers, and listeners are disposed on unmount. No network fonts or large external textures are required.

## Checks

`npm run lint` remains the original TypeScript check; ESLint is not configured.
Run `npm run test:browser` after `npm run build` (Chrome must be installed).
