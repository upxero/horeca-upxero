# Phase E.1 — local implementation and verification

Scope: Upxero.com only. No commits, pushes, deployments, dependency changes, Ordering/Whop changes, customer subscription changes, invoice changes or Netlify function changes.

## Commercial implementation

| Package | Monthly / per maand | One-time setup / eenmalige opstartkosten | Final scope / definitieve omvang |
| --- | --- | --- | --- |
| Start | €19 | €100 | Existing website ordering integration / bestelintegratie in bestaande website; Ordering Free; initial setup assistance / hulp bij de eerste inrichting; email support / ondersteuning per e-mail. No external website hosting, maintenance or security updates / geen hosting, onderhoud of beveiligingsupdates van de externe website. |
| Grow | €29 | €200 | Responsive website, five pages total / responsive website, vijf pagina’s totaal; Ordering Pro; one standard domain allowance up to €15/year / één standaarddomein tot €15/jaar; two business email accounts / twee zakelijke e-mailaccounts; hosting, maintenance, security updates / hosting, onderhoud, beveiligingsupdates; basic technical SEO / technische SEO-basisinrichting; email support and ordering integration / e-mailondersteuning en bestelintegratie. |
| Boost | €49 | €250 | Grow plus ten pages total / Grow plus tien pagina’s totaal; five email accounts total / vijf e-mailaccounts totaal; priority support and advice without guaranteed response times / ondersteuning met voorrang en advies zonder gegarandeerde reactietijden; two small existing-text/image changes monthly / twee kleine wijzigingen aan bestaande teksten of afbeeldingen per maand. |

English and Dutch versions count separately. Standard legal pages are excluded. Boost's unused changes do not carry over; new pages, redesigns, functionality and extensive content creation require a separate quotation. Domain availability is not guaranteed; premium/additional domains and allowance overruns require a separate agreement. Storage sizes and migration services are not promised because the hosting arrangement could not be verified from the available corporate repository.

All package/setup prices are disclosed excluding VAT. Temporary setup discounts, crossed-out prices and urgency copy are removed. Ordering Free remains €0/month separately; Grow/Boost Pro access is manually activated by Upxero without separate Whop payment. No standalone Pro price is displayed. Package features contain no AI assistant, WhatsApp automation or Talent benefits.

New website terms and FAQ now state six months, then monthly cancellation with at least 30 days' written notice by email, effective at a monthly subscription boundary. Existing customer agreements are expressly unchanged. Other legal provisions are preserved. No independent legal-compliance certification is claimed.

## Technical implementation

- Package CTAs use localized, whitelisted `?plan=start|grow|boost` values. Contact applies query intent after hydration and only when the query changes. Locale-only switches preserve edited drafts and selections. The Grow upgrade subject takes precedence over conflicting plan input.
- Thank You has neutral copy, the existing language selector, Router navigation and the existing hydration-safe year hook; noindex remains unchanged.
- Nested Link/Button controls use `Button asChild`. Shared pages have main landmarks and Header skip links. Mobile-menu Escape restores toggle focus. Pricing comparison headers and included/not-included text are accessible.
- Support uses the existing Radix dialog with localized title/close text, modal semantics, initial focus, containment, Escape and opener focus restoration.
- Pricing headings and CTA wrapping accommodate narrow viewports. Consent actions wrap within the viewport. Scroll-to-top is fixed bottom-left; WhatsApp is fixed bottom-right above the reserved chat-launcher area. The support hint remains in a normal-flow utility row, with footer-end clearance for the floating buttons. Floating buttons yield to the open privacy panel and mobile menu without changing consent behavior. White-on-orange actions use a darker orange for readability.
- Contact package option labels show the package and price concisely to avoid native-select clipping. Thank You's shared selector has a light backing so both languages remain readable. The unverified “Most popular” badge wording is replaced by the factual “Website + Pro” label while retaining the existing Grow highlight.

## Analytics and disclosures

The unconditional PostHog SDK snippet was removed. The existing PostHog project is retained through a narrowly scoped, documented event API request, without loading an SDK or adding dependencies. Only an explicitly allowed page-view event can be sent. No replay, autocapture, identify call, DOM inspection or persistent analytics identifier exists in this integration.

Payloads contain a registered page URL without query/hash, an event-specific random ID and flags disabling person-profile processing and IP location enrichment. Requests omit browser credentials and referrer information. The provider still receives transport information; no claim is made that the browser can prevent all server-side processing.

Consent uses `upxero.privacy.v1`, a version and a six-calendar-month expiry. Closing is not acceptance. Allow/Reject have equal presentation. Every page has Privacy settings. Withdrawal aborts an outstanding request, stops future pageviews and removes identifiable legacy PostHog local/session storage and accessible cookies where possible. It cannot undo an event already received, or erase inaccessible/foreign-domain/HttpOnly storage. Consent changes synchronize across tabs; expiry is checked before pageviews and periodically.

EN/NL cookie and privacy disclosures describe actual localStorage usage and distinguish other providers. The integration follows PostHog's [event API documentation](https://posthog.com/tutorials/api-capture-events).

Remaining external integrations include Botpress scripts, Emergent tooling (with additional editor scripts in iframes), Turnstile on Contact, and externally hosted images/fonts. Rejecting PostHog does not disable these. Provider contracts, retention, international transfers and the necessity/consent treatment of those integrations need owner/privacy review before publication. No external account settings were changed.

## Netlify and SEO

`netlify.toml` retains its build settings and `/api/*` function rewrite. Only the final SPA Home rewrite was replaced: `/nl/*` serves the generated Dutch 404 with status 404; the final `/*` serves English `404.html` with status 404. Rules are not forced, so real static files remain available. The generated exact valid-route/alias rewrites in `_redirects` precede these TOML fallbacks.

The same React application renders both error bodies. They contain useful localized Home navigation and initial noindex, with no canonical or hreflang. The valid 20-route manifest, localized page content, canonical/hreflang, Open Graph, JSON-LD and 18-entry sitemap are preserved. No framework migration occurred.

The local delivery harness reads generated `_redirects` and the actual TOML rules. This tests local rule behavior; it is not deployed Netlify/CDN verification. The function rewrite is checked without invoking a function.

## Verification

- Full frontend suite: 120 tests across six suites passed, including EN/NL Thank You year-boundary hydration.
- Production build: passed; postbuild rendered and statically verified all 20 valid localized routes plus two error pages.
- Static checks: canonical/hreflang uniqueness, metadata, noindex, structured data, sitemap, assets and valid-route rewrites passed.
- Local delivery: 63 requests passed, including direct/refresh/alias checks and four nested EN/NL unknown paths returning 404. Production-bundle jsdom hydration passed on all 20 routes and both unknown languages; contact query/draft/language/navigation checks passed.
- Final real Chrome verification passed: 32 targeted EN/NL route/viewport checks at 320/390/768/1440px with no unintended document overflow, package option-label fit checks, package CTA navigation, EN/NL contact drafts, menu Escape, dialog focus containment/restoration and mocked consent acceptance/rejection/withdrawal. The completed 60-combination Phase E inspection was not repeated. Screenshots were spot-reviewed across the four widths; external integrations and remote image/font requests were blocked in this regression run. Unchanged images had loaded during Phase E's earlier visual inspection.
- Final Chrome artifacts: `C:/Users/Mike/AppData/Local/Temp/upxero-phase-d-browser-artifacts-kiHBYe` (32 viewport screenshots, additional Pricing/Contact content crops, and two general reference screenshots).
- `git diff --check`: passed; existing line-ending notices are not whitespace errors.
- Frontend lockfile remains SHA256 `98F2A3EF411BDAF804D92754C7185F1D9342DD691AECC5906EEF0DDDFF9D1951`.

The build warns that its existing Browserslist dataset is old. It was not updated because dependency changes are outside scope. Tests use mocked contact/analytics requests and block external services; no real submissions or analytics events are sent. Live mailbox provisioning, analytics ingestion and deployed CDN behavior are not claimed verified.

## Files changed in Phase E.1

- `netlify.toml`.
- `frontend/public/index.html`, `frontend/public/_redirects`.
- `frontend/src/App.js`, `frontend/src/App.css`, `frontend/src/mock.js`, `frontend/src/prerender.jsx`.
- `frontend/src/components/{CookieBanner,FloatingSupportHint,Header,ScrollToTop,WhatsAppButton,WhatsAppPopup}.jsx`, `frontend/src/components/ui/dialog.jsx`.
- `frontend/src/hooks/useSEO.js`, `frontend/src/i18n/LocalizedRoutes.jsx`.
- `frontend/src/pages/{Home,Services,Pricing,About,Contact,PortfolioRestaurants,PrivacyPolicy,TermsConditions,CookiePolicy,ThankYou}.jsx`; new `NotFound.jsx`. Portfolio data/cards remain unchanged; its change adds the main landmark only.
- Both `frontend/src/i18n/locales/{en,nl}/{about,common,contact,content,cookies,home,pricing,privacy,services,terms,thankYou}.json`.
- New `frontend/src/privacy/analytics.js`, `frontend/src/privacy/finalCorrections.test.jsx`.
- `frontend/src/i18n/{pages,shared}.test.jsx`, `frontend/src/seo/seo.test.jsx`.
- `frontend/scripts/{prerender,verify-browser,verify-delivery,verify-html}.cjs`; new `local-routing.cjs`, `verify-final-browser.cjs`.
- This report. Earlier phases' uncommitted changes remain in the workspace; the list above is scoped to Phase E.1, not the full git diff from HEAD.

## Publication gate

### Final scoped UI correction pass

The homepage rendered the same five contractual paragraphs twice. The second block outside the pricing container was removed in both languages; the first remains below the pricing cards, with improved spacing, heading size and line height. All paragraph values and dedicated Pricing conditions are unchanged.

The two support buttons had lost their fixed-position classes and entered normal document flow. Scroll-to-top now sits 16px from the viewport bottom/left; WhatsApp sits 16px from the right and 96px from the bottom, leaving a 16px gap above a standard 64px launcher placed 16px from the bottom. Both use z-index 40, below the existing mobile header and privacy panel. The existing hint stays in document flow; footer-end space keeps footer links clear. CSS hides these buttons while the privacy panel or mobile menu is open, without changing their state or consent logic.

Exact files changed in this final pass:

- Production: `frontend/src/pages/Home.jsx`, `frontend/src/components/ScrollToTop.jsx`, `frontend/src/components/WhatsAppButton.jsx`, `frontend/src/App.css`.
- Verification: new `frontend/src/i18n/homeUi.test.jsx`, new `frontend/scripts/verify-home-ui.cjs`, `frontend/scripts/verify-browser.cjs`, `frontend/scripts/verify-delivery.cjs` (focused `--ui-only` mode).
- Documentation: `docs/phase-e1-verification.md`.

Verification of this pass only:

- Four focused EN/NL Home/Pricing tests passed, checking one homepage block, placement, exact paragraph values and retained Pricing conditions/FAQ.
- Final production build passed. All 20 localized prerendered bodies/heads and 18 sitemap URLs passed static verification, including canonical/hreflang, noindex, schema, assets and rewrites.
- Two builds were needed: the first successful build was followed by a browser-detected CSS selector defect (matching the notification section after privacy closed). The selector was narrowed to the fixed privacy panel and the corrected output rebuilt. No further builds or full-suite reruns were performed.
- Eight real headless Chrome EN/NL homepage cases passed at 320/390/768/1440px: no horizontal overflow; one contained conditions block; fixed viewport positions while scrolling; no footer/privacy-link overlap; open privacy/mobile-menu priority; keyboard scroll-to-top and support-dialog activation/Escape. Closing the privacy panel did not save consent.
- Screenshots: `C:/Users/Mike/AppData/Local/Temp/upxero-phase-d-browser-artifacts-Wa8TM5`. Dutch 320px and English 1440px footer screenshots were visually spot-reviewed.
- External requests were blocked and fetch mocked. Botpress spacing used a mock launcher rectangle; live third-party behavior was not tested. No temporary diagnostic script or real form submission was run.
- `git diff --check` passed. The existing Browserslist age warning remains. Chrome retained a locked temporary profile after shutdown; this does not affect project output.

Prices, contractual wording, translations, privacy behavior, routing, SEO and external integration configuration were not changed in this pass. No commit, push or deployment was performed.

Before publication, review provider privacy arrangements, mailbox storage/migration limits and final contractual wording. Check Netlify delivery in an approved deployment environment. Publication itself requires explicit owner approval. No deployment has been performed.

No unresolved technical failure remains in the executed local checks. Third-party privacy review and deployed Netlify verification remain publication gates. Mailbox storage/migration limits are not verified and are not advertised. Optional visual polish remains possible, including aligning package CTAs vertically where feature-list lengths differ. This work is not a full WCAG, screen-reader or cross-browser certification.
