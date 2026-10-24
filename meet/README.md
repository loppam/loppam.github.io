# /meet

The NFC networking page has a separate layout but uses the existing React app,
fonts, profile links, and project assets. NOC on this page means Nocturnal, the
owner's entertainment and lifestyle brand. It is not the separate crypto
launchpad case study.

## Files

- `src/pages/Meet.tsx`: page content, contact links, native share and copy fallback.
- `src/styles/meet.css`: scoped mobile-first layout and reduced-motion-aware entrance.
- `src/pages/Portfolio.tsx`: existing portfolio layout and routes, moved from App.
- `src/App.tsx`: separate lazy-loaded meet/portfolio routes and route scroll reset.
- `src/hooks/usePageMeta.ts`: client navigation metadata and canonical updates.
- `meet/index.html`: initial HTML metadata for social crawlers.
- `vite.config.js`: two HTML build entries and local meet routing.
- `vercel.json`: specific meet rewrites before the portfolio SPA fallback.
- `public/meet/`: transparent 360/720px WebP/AVIF portraits and 1200×630 OG JPEG.
- `public/Ololade-Pariola.vcf`: vCard 3.0 with CRLF endings and the owner-approved mobile number.
- `.gitattributes`: preserves vCard CRLF line endings across checkouts.
- `public/sitemap.xml`: discoverable meet URL.
- `scripts/check-meet.mjs`: dependency-free built-artifact checks.
- `package.json`: `check:meet` command.

The portrait derivatives use the owner's supplied “Afro Portrait Sticker Avatar.png”.
No replacement avatar was generated. The OG image combines that same portrait
with the existing Trap font. The JPEG has an intentional dark background;
the hero AVIF/WebP files retain alpha transparency.

## Validation

Run `npm run lint`, `npm run build`, then `npm run check:meet`.
The existing ESLint configuration covers JavaScript; there is no configured
TypeScript type-check command. The Vite build transpiles TSX.

Chrome browser checks covered 320×568, 375×667, 390×844, 430×932, 768×1024,
1024×768, and 1440×1000. They checked horizontal overflow, one H1, three
featured projects, initial mobile CTA visibility, loaded imagery, download bytes,
social hrefs, sharing success/cancellation/fallback branches, reduced motion,
keyboard skip-link focus, 44px action targets, touch-emulated case navigation,
back navigation, and absence of runtime exceptions. Existing homepage, case
studies, writing, update, and not-found routes were exercised.

The production build was tested through Vite preview. Direct HTML responses,
including `/meet?from=nfc`, contained the meet metadata. The portfolio animation
bundle was not requested on initial meet entry. Native share branches were
simulated; OS share sheets and iOS/Android Contacts imports were not tested.

## Owner items and content boundaries

- Public mobile number: +234 913 802 7017 (approved October 24, 2026).
- Traction metrics were omitted: this portfolio has claims but no underlying
  analytics establishing current ticket/user counts.
- GitHub, X, and Noctix returned HTTP 200 during destination checks. LinkedIn
  returned HTTP 999 to automated requests; its href matches the shared profile.
- Project images are public-site captures. No admin design frame is presented
  as a shipped screen.
- Existing case studies, their naming, and their claims were not rewritten.

When changing contact details, update the shared profile and the vCard together.
Keep CRLF endings, escape vCard text delimiters if added, and fold physical
lines at 75 UTF-8 octets. The check script detects contact drift and malformed
line endings. When changing the introduction, keep the page hook and initial
HTML metadata in sync.

The owner approved mobile 09138027017 on October 24, 2026. The shared vCard now includes TEL;TYPE=CELL:+2349138027017. The /meet interface is unchanged.
