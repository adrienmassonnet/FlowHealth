<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the FlowHealth Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (the Next.js 15.3+ approach) with a reverse proxy through `/ingest` to avoid ad-blocker interference. A server-side PostHog client (`src/lib/posthog-server.ts`) handles critical API route events. User identity is established when a visitor submits the pre-launch waitlist form — the email is used as the distinct ID both client-side (via `posthog.identify`) and server-side, and the client's anonymous distinct ID is aliased to the email so the full anonymous session history is preserved.

| Event | Description | File |
|-------|-------------|------|
| `purchase_type_selected` | User selects subscribe or one-time purchase option | `src/app/products/[handle]/PurchaseSelector.tsx` |
| `checkout_cta_clicked` | User clicks the primary Get Flow CTA to initiate checkout | `src/app/products/[handle]/PurchaseSelector.tsx` |
| `prelaunch_signup_submitted` | User submits their email address in the waitlist modal | `src/app/components/PreLaunchModal.tsx` |
| `prelaunch_signup_succeeded` | Waitlist submission confirmed (client-side) | `src/app/components/PreLaunchModal.tsx` |
| `savings_breakdown_opened` | User opens the monthly savings comparison modal | `src/app/components/SavingsBreakdownModal.tsx` |
| `checkout_created` | Shopify checkout URL created — server-side conversion event | `src/app/api/checkout/route.ts` |
| `prelaunch_email_captured` | Email validated and saved to Klaviyo — server-side lead event | `src/app/api/prelaunch/route.ts` |
| `subscription_cancelled` | Customer cancelled their subscription (with reason) | `src/app/api/subscription/cancel/route.ts` |
| `subscription_paused` | Customer paused their subscription | `src/app/api/subscription/pause/route.ts` |
| `subscription_resumed` | Customer reactivated a paused subscription | `src/app/api/subscription/resume/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics (wizard)](https://eu.posthog.com/project/205942/dashboard/761507)
- **Pre-launch conversion funnel:** [ZwK6Wk9k](https://eu.posthog.com/project/205942/insights/ZwK6Wk9k) — CTA click → form submit → confirmed signup
- **Pre-launch signups over time:** [04JFxNJJ](https://eu.posthog.com/project/205942/insights/04JFxNJJ) — daily lead capture trend
- **Purchase type preference:** [hUP1cYl5](https://eu.posthog.com/project/205942/insights/hUP1cYl5) — subscribe vs one-time selection breakdown
- **Subscription churn events:** [27gb81iI](https://eu.posthog.com/project/205942/insights/27gb81iI) — cancellations, pauses, and resumes over 90 days
- **Checkout created:** [yke3okQq](https://eu.posthog.com/project/205942/insights/yke3okQq) — daily server-side checkout conversion count

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — currently identify only fires on fresh prelaunch form submission; returning visitors who are already on the waitlist will remain anonymous until they submit again.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
