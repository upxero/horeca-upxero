# Bilingual interface (Phases A–C)

The URL is authoritative: unprefixed routes use English and `/nl/...` routes
use Dutch. There is no browser detection or preference-based redirect.

`LanguageProvider` supplies `useLanguage()` with `language`,
`switchLanguage('en' | 'nl')`, and `localize('/pricing#plans')`. Only explicit
switches persist `upxero.language`; storage failures do not block navigation.
Stored preferences never override an explicit URL. The localized URL survives
refresh, and localized Header, Footer and page links preserve the chosen language.

`routes.js` owns the supported paths and locale transformations. External links,
unknown destinations and unsupported languages pass through unchanged. Unknown
routes retain the application's existing unmatched-route behavior; a dedicated
404 and hosting behavior remain for the SEO phase.

`LocalizedRoutes` uses React Router's optional static locale segment so both
language URLs share a route identity. Locale switches preserve page state and
the actual pathname, search parameters and hash remain visible to page hooks.

`index.js` registers both languages for `common`, `about`, `contact`, `content`,
`cookies`, `home`, `portfolio`, `pricing`, `privacy`, `services`, `terms` and
`thankYou`. English remains the default and fallback. Resources are bundled so
switching does not require a translation request. Add matching keys to both
languages; use `Trans` for complete phrases containing styled spans or links,
rather than concatenating fragments that depend on word order.

Pages use their own namespace. Data factories in `mock.js` receive the page's
translation function and use explicit `content:` keys. Product identifiers,
project names, destinations and numeric prices remain independent of copy.
The portfolio uses the shared Header selector and no longer has local language
state. Contact validation retains native constraints while supplying localized
required/email messages through `setCustomValidity`; drafts survive switching.

SEO hook calls, initial HTML metadata, canonical strategy, sitemap and hosting
remain for Phase D. The portfolio retains its pre-existing bilingual SEO logic,
now reading the shared language. The standalone thank-you page remains without
its own Header, preserving its existing layout.

Source contradictions were deliberately preserved: monthly-cancellation copy,
a six-month FAQ minimum and twelve-month terms; differing descriptions of AI
order processing/availability; and cookie-policy statements versus the existing
PostHog/localStorage implementation. Statistics and promotions were not changed.
Legal translations preserve existing conditions and dates and are not newly
approved policies. These issues require owner review separately from translation.

Dependencies are pinned. npm installs currently require the explicitly approved
`--legacy-peer-deps` because of pre-existing peer conflicts. Do not use that flag
as justification for unrelated dependency changes.

Validation:

```text
npm test -- --watchAll=false --runInBand
npm run build
```

Tests use in-memory routing/storage. Contact submissions and CAPTCHA are mocked;
tests never send real contact requests or load external integrations. Visual
desktop/mobile validation remains a separate browser check.
