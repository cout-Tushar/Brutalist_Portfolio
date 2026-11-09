# Validation — 9 November 2026

## Automated checks
- TypeScript and Next.js production build: passed.
- Playwright: 3 tests passed (Chrome).
- axe WCAG 2 A/AA and WCAG 2.1 AA: zero violations in the tested page state.
- Browser runtime: zero page errors during the initial full-page interaction run.
- No horizontal overflow at 360, 390, 768, or 1440px.
- Mobile menu opens/closes; Escape restores toggle focus.
- Architecture and skills controls update their content.
- Project controls work; clipboard contains the README-verified Hammy install command.
- Reduced-motion mode removes the WebGL canvas.
- npm audit: zero vulnerabilities after removing the temporary Lighthouse package.

## Lighthouse (local production server, headless Chrome)
| Metric | Desktop | Mobile |
| --- | --- | --- |
| Performance | 100 | 98 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 0.5 s | 2.1 s |
| Total blocking time | 10 ms | 130 ms |
| Cumulative layout shift | 0 | 0 |

These are single local lab runs, not production field measurements or a guarantee of accessibility. Desktop used the desktop preset; mobile used Lighthouse defaults. Chrome launched headless with --disable-gpu. Visual browser checks also rendered the 3D core in a separate normal headless Chrome session. The only subsequent changes were deployment-origin metadata, documentation, and removal of the audit tool.

## External evidence and limitations
- GitHub profile, Hammy repository, Co-Op Code repository, both live-demo landing pages, and Google Drive resume viewer returned HTTP 200.
- Hammy's public README verified npm install -g tushar_hammy.
- BuildCore's public demo-account sign-in returned Internal Server Error. The portfolio preserves the link; the remote backend was not modified.
- LinkedIn and npm returned HTTP 403 to automated checks. Their public URLs are retained.
- Drive HTTP 200 alone does not establish anonymous PDF download permission.
- No authenticated dashboard screenshot was available. Project interfaces are explicitly labeled illustrations; no performance figures are invented.
- Deployment domain was not supplied. NEXT_PUBLIC_SITE_URL can set social-image origin; Vercel production URL is detected automatically.
- No ESLint configuration existed; npm run lint is the original TypeScript check.
- Legacy index.html is retained unchanged because external deployment usage could not be established. Next.js is the maintained implementation.

## Tooling
Runtime additions: three (3D), lenis (desktop scrolling).
Development additions: @types/three, @playwright/test, @axe-core/playwright, prettier.
Lighthouse was used for measurement and then removed.

## Source changes
Modified app/page.tsx, app/globals.css, app/layout.tsx, package.json, package-lock.json, .gitignore.
Added app/content.ts, app/components/experience.tsx, app/components/system-core.tsx, app/components/hammy-install.tsx, app/opengraph-image.tsx, playwright.config.ts, tests/portfolio.spec.ts, .env.example, README.md, VALIDATION.md.
No original source files removed.
