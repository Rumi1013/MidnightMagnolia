# Midnight Magnolia Platform Plan

**Decision date:** July 28, 2026  
**ASAP override (2026-08):** Active repo ships **Wix Headless + Next.js on Vercel + Gumroad (digital) + Buy Me a Coffee (membership/tips)**. Align with `docs/DIGITAL_CONTENT_PIPELINE.md` and `docs/BMAC_MINIMUM.md`. Stan is deferred (cost).

This file is the hermes platform and subscription plan for the Midnight Magnolia launch.
When an older document disagrees with Active ASAP docs (`docs/BMAC_MINIMUM.md`, `docs/DIGITAL_CONTENT_PIPELINE.md`), **Active ASAP wins**.

## Launch Architecture

`GitHub -> Vercel Pro -> midnight-magnolia.com` (Next front door; Wix remains Headless backend)

Vercel is the production website host for the Next app. Wix Headless supplies catalog/bookings/blog.
ASAP digital commerce is **Buy Me a Coffee**; physical/dropship is Printify→Wix (see `docs/DROPSHIP_LANE.md`).

| Need | Current platform | Plan |
| --- | --- | --- |
| Website hosting and deployment | Vercel Pro | Authoritative production platform for Next |
| CMS / bookings / catalog API | Wix Headless | Keep as backend after DNS cutover |
| Source control and deployment trigger | GitHub | Keep connected to Vercel |
| Digital products and membership (ASAP) | Buy Me a Coffee | Primary; replaces Stan (cost) |
| Digital products (hermes alternate) | Gumroad | Not Active ASAP gate |
| Community support | Buy Me a Coffee | Tips + membership |
| Newsletter | Substack | Dusk Letters publishing and subscriber list |
| Automation | Make.com | Sole automation platform; do not duplicate in Zapier |
| Operations records | Airtable | Stay on Free until a real limit blocks launch work |
| Knowledge and content planning | Notion | Use Education Plus when eligible; otherwise stay Free until needed |
| Application data | Existing Supabase project | Stay on Free until usage requires an upgrade |
| Physical fulfillment | Printify | Post-ASAP lane (`docs/DROPSHIP_LANE.md`) |
| Blog and booking transition | Wix Business Basic | Headless source while Next is the public shell |

## Vercel Integrations

No additional paid Vercel Marketplace integration is required for launch.

### Keep Or Connect

- **GitHub:** required for repository-based previews and production deployments.
- **Existing Supabase project:** use the current project only. Do not provision a duplicate
  database from the Vercel Marketplace.
- **Substack signup:** connect the website to a real Substack signup link or embed so an
  email submission reaches the subscriber list.

### Add Only When Needed

- **Resend:** add when the website needs reliable contact-form delivery or transactional
  messages that Gumroad and Buy Me a Coffee do not send.
- **PostHog:** add after launch when conversion funnels or visitor-path analysis would
  change a business decision.
- **Dedicated error monitoring:** add only when Vercel logs are no longer sufficient.

### Do Not Add For Launch

- Stripe or Shopify, because Gumroad and Buy Me a Coffee handle payments.
- Zapier, because Make.com is the automation standard.
- Sanity, Contentful, or another CMS while Wix and Substack cover the transition.
- A second authentication provider before customer accounts exist on the website.
- A second Supabase project.

## Wix Transition

Wix remains paid and available through February 2027. It is a temporary backend bridge,
not a competing homepage.

Use the remaining paid period to:

1. Export and verify all Wix Blog and Dusk Letters content.
2. Decide whether the permanent archive lives in Substack, Notion-backed pages, or local
   website content.
3. Replace or remove the `/booking-calendar` link.
4. Test every migrated URL and preserve redirects where needed.
5. Confirm that no live page, checkout, form, or automation still depends on Wix.

Do not cancel Wix until all five checks pass. Cancellation or renewal requires the user's
explicit confirmation at action time.

## Make.com Rollout

Start on Make Free and create one workflow at a time. Upgrade to Make Core only when the
free execution interval, active-scenario limit, or credit allowance blocks a workflow that
is already useful.

First workflow:

`Website or Substack signup -> approved subscriber/lead record`

Hermes may draft and test the workflow with sample data. Activating a schedule or writing
to a live external record requires a specific `CONFIRM`.

## Launch Gaps

These are the remaining platform gaps, in priority order:

1. The Grimoire email gate currently stores the address only in the visitor's browser; it
   must submit to Substack or be replaced by a Substack signup.
2. `/booking-calendar` has no Vercel page; connect a real booking destination or remove the
   booking calls to action.
3. Wix-backed Grimoire posts need a permanent source before February 2027.
4. Gumroad product-specific links should replace the general profile link as each product
   becomes live.

## Spending Rule

Do not upgrade a service because it may be useful later. Upgrade only when:

- a launch-critical feature requires the paid tier;
- a documented limit has been reached; or
- the upgrade removes a recurring manual task that is already consuming meaningful time.

Every proposed upgrade must show its monthly cost, the exact problem it solves, and the
lower-cost alternative before requesting confirmation.
