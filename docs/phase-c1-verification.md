# Phase C.1 implementation and product verification

Review date: 10 November 2026. Local changes only; Phase D has not started.

## Commercial result

| Website package | Monthly price | Setup price retained | Ordering entitlement |
| --- | --- | --- | --- |
| Start | €19 | €100; existing 50% promotion shows €50 | Free available; Pro not included |
| Grow | €29 | €200; existing 50% promotion shows €100 | Pro included without separate Whop payment, after manual Upxero activation |
| Boost | €49 | €250; existing 50% promotion shows €125 | Pro included without separate Whop payment, after manual Upxero activation |

Only core website services are advertised. Boost's additional scope must be confirmed with Upxero; no replacement premium features have been invented.

The Pricing page separates standalone **Upxero Ordering Free — €0/month** from website packages. It directs visitors to the Ordering dashboard for Pro upgrade options and reminds them to review subscription pricing/terms before paid checkout. It displays no standalone Pro price. The cancelled €15 proposal is absent. The owner's confirmed $19/month Whop subscription is not changed.

The Header's desktop/mobile CTA and Pricing Free CTA read **Start for Free / Gratis starten**, linking to https://ordering.upxero.com. The Footer also links to Ordering. The existing shared language selector remains authoritative.

Start-to-Grow links use `/contact?subject=upgrade-grow` and `/nl/contact?subject=upgrade-grow`. Contact accepts only this exact subject code, displays a translated read-only subject, and prefixes that subject to the existing submitted message. No new API fields or endpoints were added. The visitor's draft, selected form values, query/hash, custom validation, CAPTCHA and existing submission/reset behavior are preserved. No request activates Pro, changes an invoice, or changes a subscription.

## Source review of Upxero Ordering

Read-only source: `C:/Users/Mike/Documents/Websites/UpxeroOrdering/upxero-order`.

No Ordering tests, services, databases, providers, checkout flows, or subscriptions were executed or changed. “Tested” below means implementation plus inspected tests and existing recorded local test results; it does not mean this Phase C.1 ran those tests or verified deployment.

| Feature | Classification and evidence | Marketing treatment |
| --- | --- | --- |
| Pickup ordering | Implemented with test coverage: public checkout validates ordering/pickup settings; isolated retry/scheduled checkout tests and frontend checkout tests cover order creation. See `backend/routers/public.py`, `backend/tests/test_order_retries_isolated.py`, `backend/tests/test_preorder_checkout_isolated.py`, `frontend/src/pages/order/ScheduledCheckout.test.jsx`. | Only a restrained pickup-ordering description; requires restaurant configuration and Free limits. |
| Delivery ordering | Implemented with test coverage, including zone fee preservation and Free-plan rejection: `test_scheduled_checkout_mongo_local.py` has explicit delivery cases. Requires Pro entitlement and enabled/configured delivery; real geocoding/production delivery is not verified. | No specific delivery feature promise or universal availability claim. |
| Scheduled orders | Implemented with isolated/backend/frontend tests and recorded test results in `backend/SCHEDULED_ORDERS.md`. Restaurant configuration, order-type gates, availability and time-zone rules apply. Disabled by default; 30-calendar-day scheduling horizon in inspected code. Production operation not independently verified. | Not promoted as universally available. |
| Table reservations | No table-booking implementation found in inspected frontend/backend routes, models or tests. Internal slot/quota “reservations” concern orders, not restaurant tables. Cannot establish a planned delivery date. | Not advertised. |
| Order notifications | Dashboard polling every ten seconds and browser audio exist in `frontend/src/pages/dashboard/Orders.jsx`. Active order routers use outbox enqueueing; email/provider and reminder tests exist, with recorded local results in `backend/OUTBOX.md`. The older `services/notifications.py` is logging-only and is not evidence of email readiness. Actual provider delivery and deployed worker operation remain unverified; no guaranteed real-time behavior. | No real-time, SMS, push, WhatsApp automation, or reliable email-delivery promises. |
| Free/Pro differences | Centralized implementation in `backend/services/entitlements.py`: Free permits pickup; Pro additionally enables delivery/zones, staff, email notifications and discounts. Pro access depends on verified Whop status or legacy status in inspected code. Scheduling still has restaurant/type settings. Feature flags alone do not establish production readiness. | Only owner-approved Free availability and website-package Pro inclusion are shown, with manual activation qualification. |
| Usage limits | Current source: Free allows 20 active products and 30 orders per Brussels calendar month; Pro has no configured numeric cap for those two fields. Monthly order quota/concurrency/rollback and Free delivery gating have inspected tests. A complete current product-limit regression run was not performed. Some older live scripts are quarantined, so they were not run or treated as current passing evidence. | Uses “current Free limits”; no exhaustive or unlimited-use promise. Ordering remains the detailed source. |
| Commissions/processing fees | Historical PRD describes a commission-free vision, but current approved commercial commission/processing-fee policy was not established by source/tests. No proof of a fee policy follows from absence of a fee calculation. | Removed commission guarantees and third-party fee comparisons. No new fee policy invented. |
| Customer online payments | Current checkout stores `paymentMethod: "on_pickup_or_delivery"` in `backend/routers/public.py:433`. `frontend/WIDGET_INTEGRATION.md:37` explicitly says current customer payment is on pickup/delivery and a future gateway needs separate review. | Removed Stripe, +€25, Bancontact/iDEAL/card claims. FAQ explains payment at pickup/delivery, not an online gateway. |
| Other planned channels | Older notification abstraction refers to future SMS/push/WhatsApp; source names/comments do not establish availability. | Not advertised. |

Recorded Ordering test results are historical repository evidence, not tests newly executed here. Source review cannot certify production readiness or browser behavior.

## Unresolved issues requiring separate review

1. **Paid price disclosure mismatch:** the owner confirms Whop Pro is $19/month, but Ordering source still displays **$9.99** in:
   - `backend/routers/billing.py:22` (`PRICE_LABEL`, returned from billing status);
   - `frontend/src/pages/dashboard/Subscription.jsx:36` (comparison heading);
   - `frontend/src/pages/dashboard/Subscription.jsx:88` (upgrade button);
   - `frontend/src/pages/dashboard/Subscription.jsx:117` (current price);
   - `frontend/src/lib/i18n.js:607` (English upgrade translation).
   These files remain untouched. Actual Whop checkout price/currency and the required pre-checkout $19 disclosure were not accessed or verified. This discrepancy must be resolved in a separately authorized Ordering/Whop review before paid purchase claims can be considered consistent.
2. **Manual package entitlement:** the website records an enquiry only. No secure operational workflow for manually granting website-package Pro entitlement was verified or implemented. Do not assume a Grow/Boost purchase automatically grants access.
3. **Contract contradiction retained:** existing FAQ says six-month minimum; existing legal terms say twelve months. No contractual wording was rewritten. Unqualified monthly-cancellation marketing has been removed; the remaining FAQ/legal contradiction needs an explicit business/legal decision.
4. **Setup promotion retained:** existing “limited-time” 50% setup discount has no visible expiry. Confirm duration/eligibility before publication.
5. **Extras withheld:** WhatsApp automation, AI assistant, Google Business/reporting, business email-account allowances and priority/fast-response support remain subject to owner review and are not advertised as package extras. Unverified performance/response-time figures were replaced by confirmed package prices without changing card layouts.
6. **Historical inactive copy:** the unused testimonial data and commented-out Home testimonial block remain as historical content. They contain old WhatsApp-assistant claims but are not rendered or promoted.
7. **SEO deferred:** existing metadata/structured data still includes old commission-free, WhatsApp/AI, cancellation and premium-service descriptions. All ten `useSEO` calls were verified unchanged against the available baseline. Updating these belongs to Phase D and requires approval.

## Phase C.1 files changed

Earlier Phase A/B/C changes already exist in the working tree; the list below is this phase's scope, not the entire Git diff.

- `frontend/src/components/Header.jsx`, `Footer.jsx`.
- `frontend/src/pages/Home.jsx`, `Services.jsx`, `Pricing.jsx`, `About.jsx`, `Contact.jsx`.
- `frontend/src/mock.js`.
- Both EN/NL versions of `frontend/src/i18n/locales/{en,nl}/{common,home,services,pricing,about,contact,content}.json` (14 dictionaries).
- `frontend/src/i18n/shared.test.jsx`, `pages.test.jsx`.
- This report, `docs/phase-c1-verification.md`.

## Validation

- Full frontend test suite: **79/79 tests passed in 4 suites**, using `npm.cmd test -- --watchAll=false --runInBand`; final isolated run took 17.203 seconds. An earlier concurrent test/build run hit a five-second timeout in the contact interaction test (78 passed); the final sequential run passed without changing the test timeout or assertions. Ten tests were added beyond Phase C's 69-test baseline.
- Production build: **passed**, using `npm.cmd run build`; compiled successfully. Existing stale Browserslist/caniuse-lite warning remains; dependencies were not updated.
- Babel audit: all ten pages and mock.js parse; no missing static translation references, unused i18n bindings, or broken checked root-relative image paths.
- EN/NL key parity, nonempty translations, registered namespaces and fallback covered by automated tests. The two validation keys are dynamically used through the validation helper, not unused.
- Import audit: no newly unused imports. Existing unused React/default and Home imports remain outside this change's scope.
- All ten SEO calls remain byte-for-byte unchanged; portfolio project data unchanged. Contact fetch/attribute differences are the authorized subject/message addition and read-only subject UI; mocked payload tests verify the existing endpoint and field set.
- Source audit: no Talent/recruitment promotion remains in frontend source, public assets, or translation resources (test assertions excluded).
- Lockfile SHA-256 remains `98F2A3EF411BDAF804D92754C7185F1D9342DD691AECC5906EEF0DDDFF9D1951`, matching the earlier phase baseline.
- `git diff --check`: **passed**, exit 0. Git emitted line-ending conversion notices, with no whitespace errors.
- Real browser desktop/mobile visual testing was unavailable. jsdom interaction tests do not certify responsive layout, native focus, or real browser rendering.
- No real contact submissions or payment/subscription operations. No dependency, environment, Netlify, legal-page or Ordering/Whop changes. No commit, push or deployment.

Stop after Phase C.1. Phase D remains unstarted.
