# Phase D — multilingual SEO implementation and verification

Date: 10 November 2026 (Europe/Amsterdam). Scope: Upxero.com only. Local implementation; no commit, push or deployment.

## Result

The existing CRA/CRACO application now builds **20 complete localized HTML pages**, not metadata-only shells. The same React components supply the generated HTML and the browser application. English remains the default; Dutch remains under /nl/. No framework migration or dependency installation was required.

Each route has a localized title/description, Open Graph and Twitter/X metadata, a self-referencing canonical, HTML language and JSON-LD. The 18 indexable pages have reciprocal en/nl/x-default links. Both Thank You pages have initial-HTML **noindex,follow** and are deliberately omitted from the sitemap and the indexable hreflang clusters.

| Page | English canonical path | Dutch canonical path | Indexing |
| --- | --- | --- | --- |
| Home | / | /nl/ | index,follow |
| Services | /services | /nl/services | index,follow |
| Pricing | /pricing | /nl/pricing | index,follow |
| About | /about | /nl/about | index,follow |
| Contact | /contact | /nl/contact | index,follow |
| Restaurant Portfolio | /restaurant-portfolio | /nl/restaurant-portfolio | index,follow |
| Privacy Policy | /privacy-policy | /nl/privacy-policy | index,follow |
| Terms & Conditions | /terms-conditions | /nl/terms-conditions | index,follow |
| Cookie Policy | /cookie-policy | /nl/cookie-policy | index,follow |
| Thank You | /bedankt | /nl/bedankt | noindex,follow |

Canonical origin: **https://www.upxero.com**. Query strings and hashes are omitted from canonical/social URLs, without changing visitor navigation URLs. Slash aliases resolve to the same generated document and canonical. Existing route slugs, including /bedankt, remain unchanged.

## Implementation

- Shared SEO model: `src/seo/model.js`, with registered EN/NL `seo` dictionaries. Metadata updates centrally in the existing app shell rather than through nine independent page effects.
- Client updates replace the owned head tag set, preventing duplicate canonicals, alternates and JSON-LD. Moving from Thank You back to a public page restores indexing.
- Build: existing `npm run build` runs CRACO, then the new npm `postbuild` script. Existing webpack/Babel tooling compiles a temporary Node renderer. React renders the shared AppContent with an explicit route and isolated language instance. Temporary renderer files are removed; no rendering server is deployed.
- Entry point uses `hydrateRoot` for generated markup and retains `createRoot` for ordinary development. The React node hierarchy and current page components are shared.
- Contact upgrade notices appear after hydration to match the static query-free document. Submission is disabled until hydration attaches the existing JavaScript handler. Native constraints, CAPTCHA component, field names, endpoint, payload behavior, draft state and language switching remain intact.
- Copyright uses the serialized build year for the initial hydration snapshot, then the current year. Cached pages remain hydratable across a year boundary.
- Social image: the existing branded 1024×1024 `public/favicon.png`, with localized alt text and a square Twitter summary card. No images were created, changed or replaced.
- Structured data: stable Organization and WebSite identifiers, localized WebPage/AboutPage/ContactPage, breadcrumbs where appropriate, and three Service nodes on Services: website development, hosting and maintenance. Company name, address, register number and VAT number reuse existing corporate-site information. No external company-register verification is claimed.
- Removed old page-level metadata/structured-data claims about commissions, WhatsApp/AI, unsupported statistics, premium extras and old offers. No reviews, ratings or business details were invented.
- Website prices and inclusions remain Start €19, Grow €29 and Boost €49/month; Ordering Free €0; Pro included with Grow/Boost subject to manual activation. No subscription logic or commercial page content was rewritten.

## Netlify routing: minimal necessary change

`netlify.toml` is **unchanged**, including its build command, publish/functions directories, API rule and final SPA fallback.

Generated localized documents live at internal `/_prerender/...` paths; the English home remains `/index.html`. The build generates explicit status-200 rewrites from each public route and slash alias to its corresponding HTML file. This preserves existing public URLs and avoids relying on directory/trailing-slash normalization.

The duplicate catch-all was removed from `public/_redirects`. That source file retains the existing sitemap/robots rules; the build prepends the localized rewrites. The final fallback remains in netlify.toml. This ordering is necessary because Netlify processes `_redirects` before `netlify.toml`.

Official references:
- [Netlify rule processing order](https://docs.netlify.com/manage/routing/redirects/overview/#rule-processing-order)
- [Netlify rewrites](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/)
- [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

The local routing harness verifies the generated explicit route rules, not Netlify's entire CDN implementation. Actual deployed behavior remains a publication-stage check.

## Sitemap and robots

- Generated sitemap: **18 canonical URLs**, each with en, nl and x-default alternatives. Both language versions of all nine indexable pages are present, including Portfolio.
- Thank You is absent from the sitemap.
- Removed obsolete hardcoded modification dates rather than inventing new dates.
- The versioned public sitemap and generated output must match, allowing Windows/Linux line-ending differences.
- Existing robots.txt is production-compatible and unchanged: crawling is allowed and the canonical sitemap URL is declared.
- Thank You is not disallowed in robots.txt: crawlers must be allowed to read its noindex meta directive.

## Verification results

- **Full frontend suite: 106/106 tests passed in 5 suites** (43.954 seconds), including 27 SEO/hydration tests beyond the previous 79-test baseline.
- **Production build and postbuild prerender: passed.** Compiled JavaScript: 168.81 kB gzip; CSS: 11.76 kB gzip.
- **Static HTML verification: passed on all 20 outputs.** Meaningful headings and page content, EN/NL language, unique titles/descriptions, one canonical, reciprocal alternates, OG/Twitter consistency, JSON-LD, existing social asset, pricing/form/portfolio markup, disabled pre-hydration contact submission, localized noscript notice and route rewrites.
- **Local HTTP: 59 direct-entry, repeated-request/refresh-equivalent and slash-alias checks passed across all 20 routes.**
- **Actual production bundle in jsdom:** hydration passed on all 20 pages, preserving existing heading nodes. Both EN/NL upgrade-query entry points preserved draft, query/hash and language preference while switching languages and navigating.
- **Real installed Chrome:** direct entry and cache-bypassing browser refresh passed on all 20 routes at both **1440×1000 desktop and 390×844 mobile** (80 route-load checks). No hydration errors, duplicate canonicals or horizontal document overflow were detected. Both EN/NL contact upgrade URLs preserved draft/query/hash/language preference, and the mobile menu navigated and closed correctly. Existing prerendered heading nodes were retained.
- **Screenshots inspected:** desktop English Home and mobile Dutch Home; header, language indicator, text flow and CTA layout remained coherent. Remote hero images are absent because external resources were deliberately blocked. Final screenshots: `C:/Users/Mike/AppData/Local/Temp/upxero-phase-d-browser-artifacts-8Lyv1l/desktop-home-en.png` and `mobile-home-nl.png` in that directory. These temporary artifacts are not part of the deploy output or repository.
- **Whitespace/static source checks:** `git diff --check` passed (exit 0). Existing Git LF/CRLF conversion notices remain. Production compilation, static verification, parsed EN/NL resources and executed verification scripts passed. No changes in netlify.toml, Netlify functions or the root package-lock.json.
- Frontend lockfile SHA-256 remains `98F2A3EF411BDAF804D92754C7185F1D9342DD691AECC5906EEF0DDDFF9D1951`, identical to the Phase C.1 baseline. No dependencies were added or changed.

Real-browser tests use a separate temporary browser profile, local production assets, blocked external HTTPS/services, a test-only CAPTCHA stub and blocked fetch submissions. They do not use the user's browser profile or make real contact submissions. The local HTTP/jsdom checks never run analytics/chat scripts. The real-browser pass loads the corporate HTML and application while external resources are blocked.

## Files in this phase

Existing uncommitted Phase A/B/C/C.1 work is preserved; a full Git diff also contains those earlier changes.

- `frontend/package.json`: build and verification scripts only.
- `frontend/public/index.html`, `_redirects`, `sitemap.xml`.
- `frontend/src/App.js`, `index.js`, `prerender.jsx`.
- `frontend/src/components/Footer.jsx`.
- `frontend/src/hooks/useSEO.js`, `useCurrentYear.js`.
- `frontend/src/pages/Home.jsx`, `Services.jsx`, `Pricing.jsx`, `About.jsx`, `Contact.jsx`, `PortfolioRestaurants.jsx`, `PrivacyPolicy.jsx`, `TermsConditions.jsx`, `CookiePolicy.jsx`: old SEO removal; Contact additionally has the hydration guards. Legal body wording is unchanged. ThankYou.jsx itself needed no Phase D edits because metadata is now centralized.
- `frontend/src/i18n/index.js`, `pages.test.jsx`, `locales/en/seo.json`, `locales/nl/seo.json`.
- `frontend/src/seo/model.js`, `seo.test.jsx`.
- `frontend/scripts/prerender.cjs`, `verify-html.cjs`, `verify-delivery.cjs`, `verify-browser.cjs`.
- This report, `docs/phase-d-verification.md`.

## Reproduce

Run from frontend:

```text
npm.cmd test -- --watchAll=false --runInBand
npm.cmd run build
npm.cmd run verify:html
npm.cmd run verify:delivery
npm.cmd run verify:browser
```

The browser command requires an existing supported local Chrome/Edge installation. It never installs a browser or dependency. It also runs the HTTP/jsdom checks. Build-time verification runs automatically after the existing Netlify build command. Source/content changes require a new full build.

## Remaining checks and issues before publication

1. **Actual hosting verification:** no deployment was authorized. Confirm the generated rewrites, canonical www domain, query handling, cache behavior and direct refresh responses on the eventual Netlify preview/production deployment. The local server is not the Netlify CDN.
2. **External integrations/assets:** real-browser tests intentionally blocked remote images, analytics, chat and live CAPTCHA. The screenshots therefore show missing remote hero images. Review with external resources enabled in an approved preview; no real form submission is needed. Live provider behavior is not certified.
3. **Browser scope:** Chrome desktop/mobile emulation is covered. Physical mobile devices, Safari and Firefox have not been tested.
4. **Existing contract discrepancy:** FAQ still says six-month minimum while legal terms say twelve months. This pre-existing issue needs a separate business/legal decision; Phase D did not rewrite either.
5. **Existing promotion:** retained 50% “limited-time” setup promotion has no visible expiry. Confirm its validity before publication.
6. **Unknown paths:** the pre-existing SPA status-200 fallback remains for unregistered URLs. Client-side handling now removes stale page canonicals and adds noindex, but a dedicated HTTP 404 response remains a separate improvement outside the ten-page scope.
7. **Build warning:** existing Browserslist/caniuse-lite data is stale. No dependency update was performed.
8. **Search engine acceptance:** local validation establishes output correctness, not indexing or rich-result eligibility. Check Search Console URL inspection and structured-data tools after an authorized preview/deployment.

Upxero Ordering, its API and Whop were not audited, modified or tested in this phase. Existing customer subscription arrangements, Netlify functions, environment files and package prices are unchanged. Price and contact-form preservation were tested within the corporate frontend using local data and mocks. No commits, pushes or deployments.
