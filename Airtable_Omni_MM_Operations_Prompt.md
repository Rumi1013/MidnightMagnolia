# Airtable Omni — Complete Setup Prompt
## Midnight Magnolia Operations + Career Command
### Rumi-Nations LLC · Latisha Vincent-Waters · Ravenel, SC

> Paste this prompt into Airtable Omni to build both operational bases.
> Work through one BASE and one TABLE at a time for best results.
> Field names used here match the Zapier / Make.com automation schemas
> in the MM Canonical Master Plan exactly — do not rename them.

---

# BASE 1 — MIDNIGHT MAGNOLIA OPERATIONS

Create a base named: **Midnight Magnolia Operations**
Workspace: Midnight Magnolia / Rumi-Nations LLC
Color: Gold (#C9A84C)
Icon: Magnolia flower or star

This base is the operational hub for the Midnight Magnolia brand —
products, content, revenue, audience, and affiliate relationships.

---

## TABLE 1 — Products

Create a table named **Products**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Product Name | Single line text | **Primary field** |
| Product Code | Single line text | P0–P7, S1–S4, KDP-1 through KDP-7, POD-1 through POD-6 |
| Category | Single select | Digital Download · Lead Magnet · Membership · Bundle · Service · KDP · POD · Notion Template |
| Price | Currency | USD |
| Build Stage | Single select | Not Started · Content Drafting · Design In Progress · Stan Store Live · Patreon Live · Complete |
| Platform | Multiple select | Stan Store · Gumroad · Patreon · KDP · Printify · Wix |
| Content Done | Checkbox | |
| Design Done | Checkbox | |
| Live | Checkbox | |
| Stan Store URL | URL | |
| Canva File URL | URL | |
| Gumroad URL | URL | |
| Priority | Single select | Critical · High · Medium · Low |
| Upsells To | Single line text | Product code of the next-tier product |
| Target Audience | Single line text | e.g. "ND women, healing-centered creators" |
| Est Monthly Revenue | Currency | Projection |
| Units Sold MTD | Number | Month-to-date units — update manually or via Zapier Z-01 |
| Notes / Next Action | Long text | |
| Last Updated | Last modified time | Auto |

### Pre-populate these records

| Product Name | Code | Category | Price | Priority |
|---|---|---|---|---|
| The Gentle Beginning (Free Starter Kit) | P1 | Lead Magnet | $0 | Critical |
| Magnolia Circle Membership | P4 | Membership | $9/mo | Critical |
| Shadow Work Starter Kit | P2 | Digital Download | $9 | Critical |
| Soft Reset Page | P0 | Digital Download | $5 | High |
| Altar Keeper's Affirmation Deck | P1b | Digital Download | $12 | High |
| Dusk Reset Journal | P2b | Digital Download | $17 | High |
| Ancestral Healing Journal | P3 | Digital Download | $19 | High |
| Brand Voice Workbook | P5 | Digital Download | $22 | Medium |
| Soft Launch Guide | P7 | Digital Download | $27 | Low |
| Sanctuary OS (Notion Template) | P5b | Notion Template | $37 | Medium |
| Deep Roots Shadow Work System | P6 | Bundle | $49 | Medium |
| Brand Voice Clarity Session | S1 | Service | $197 | Live |
| Creative Direction | S2 | Service | $127 | Live |
| Notion Sanctuary Setup | S3 | Service | $297 | Live |
| VIP Half-Day Intensive | S4 | Service | $497 | Live |
| 1:1 Creative Strategy Session | S5 | Service | $97–$147 | Medium |
| The Awakening (KDP) | KDP-1 | KDP | $12.99 | Medium |
| Bayou Folk (KDP) | KDP-2 | KDP | $14.99 | Medium |
| Cane (KDP) | KDP-3 | KDP | $13.99 | Medium |
| Heart of a Woman (KDP) | KDP-4 | KDP | TBD | Low |
| The Weary Blues (KDP) | KDP-5 | KDP | TBD | Low |
| Hardcover Shadow Work Journal (POD) | POD-1 | POD | $28 | High |
| Midnight Magnolia Soy Candle (POD) | POD-2 | POD | $20 | High |
| Crystal Healing Set (Dropship) | POD-3 | POD | $30 | Medium |
| Physical Affirmation Card Deck (POD) | POD-4 | POD | $32 | Low |
| Sanctuary Tote Bag (POD) | POD-5 | POD | $28 | Low |

### Views

1. **Build Queue** — Grid · filter: Live = unchecked · sort by Priority (Critical first)
2. **Live Products** — Grid · filter: Live = checked · sort by Price desc
3. **Digital Only** — Grid · filter: Category is Digital Download, Lead Magnet, or Bundle
4. **Services** — Grid · filter: Category = Service
5. **KDP Pipeline** — Grid · filter: Category = KDP
6. **POD Pipeline** — Grid · filter: Category = POD
7. **Revenue Tracker** — Grid · all records · sort by Est Monthly Revenue desc
8. **By Priority** — Kanban · grouped by Priority

---

## TABLE 2 — Content Calendar

Create a table named **Content Calendar**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Title | Single line text | **Primary field** |
| Content Type | Single select | Blog Post · Dusk Letters · TikTok · Facebook Post · Instagram Post · Instagram Reel · Pinterest Pin · YouTube Video · YouTube Short · Patreon Drop · Stan Store Email · Magnolia Circle Drop · Substack Post |
| Status | Single select | Idea · Drafting · Designed · Scheduled · Published |
| Publish Date | Date | Include time field |
| Platform(s) | Multiple select | Wix Blog · Substack · Stan Store · TikTok · Facebook · Instagram · YouTube · Pinterest · Email · Patreon |
| Content Pillar | Single select | Shadow Work & Healing · Southern Gothic & Roots · Neurodivergent Creator · Creative Process · Product · Genealogy |
| Linked Product | Link to another record | Links to Products table |
| Affiliate Link | Single line text | Affiliate URL if this post promotes a partner |
| Copy URL | URL | Google Doc or Notion page with full copy |
| Visual URL | URL | Canva design link |
| Hook / Opening Line | Long text | The first line — drafted before anything else |
| CTA | Single line text | What is the one ask? e.g. "Download free kit" |
| Theme Tag | Multiple select | Shadow Work · Ancestral Healing · ND Creator · Genealogy · Recovery · Rest · Southern Gothic · Product Launch · Membership |
| Energy Required | Single select | Low Spoon · Medium · High Focus |
| Repurpose From | Single line text | Note if this is repurposed from another piece |
| Repurpose To | Long text | List formats this can become after publishing |
| Performance Notes | Long text | Engagement stats, what landed, what didn't |
| Created | Created time | Auto |

### Views

1. **This Week** — Calendar · date field: Publish Date · current week
2. **Content Queue** — Grid · filter: Status = Idea or Drafting · sort by Publish Date
3. **Ready to Schedule** — Grid · filter: Status = Designed
4. **Published** — Grid · filter: Status = Published · sort by Publish Date desc
5. **By Platform** — Gallery · grouped by Platform(s)
6. **By Pillar** — Grid · grouped by Content Pillar
7. **Low Spoon Days** — Grid · filter: Energy Required = Low Spoon · Status ≠ Published
8. **Monthly Calendar** — Calendar · monthly view

---

## TABLE 3 — Sales Log

Create a table named **Sales Log**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Sale ID | Autonumber | **Primary field** — auto-increments |
| Product | Link to another record | Links to Products table |
| Product Name (text) | Single line text | Flat text copy — for display when Product link not set |
| Sale Date | Date | Include time |
| Amount | Currency | USD |
| Platform | Single select | Stan Store · Gumroad · Patreon · KDP · Printify · Wix Store |
| Source | Single select | Organic · Email · TikTok · Facebook · Instagram · YouTube · Pinterest · Affiliate · Direct |
| Affiliate Partner | Link to another record | Links to Affiliate Pipeline table — if applicable |
| Customer Email | Email | Optional — for follow-up |
| Notes | Single line text | |
| Month | Formula | `DATETIME_FORMAT(Sale Date, 'YYYY-MM')` — for monthly grouping |

### Views

1. **All Sales — Newest First** — Grid · sort by Sale Date desc
2. **This Month** — Grid · filter: Month = current month
3. **By Product** — Grid · grouped by Product
4. **By Platform** — Grid · grouped by Platform
5. **Affiliate Sales** — Grid · filter: Affiliate Partner is not empty
6. **Monthly Summary** — Grid · grouped by Month · with Sum of Amount

---

## TABLE 4 — Contacts

Create a table named **Contacts**.

> This is your primary subscriber and lead list.
> Records flow in via Zapier Z-02 (new email subscriber)
> and Zapier P-01 (new Patreon pledge).

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Email | Email | **Primary field** — deduplication key |
| First Name | Single line text | |
| Last Name | Single line text | |
| Full Name | Formula | `First Name & " " & Last Name` |
| Subscribed Via | Single select | Gentle Beginning · Dusk Letters · Patreon · BMAC · Grimoire · Stan Store · Direct · Affiliate Referral |
| Subscribed Date | Date | |
| Status | Single select | Active · Unsubscribed · Paused · Bounced |
| Tags | Multiple select | freebie · magnolia-circle · patreon · candle-tender · circle-keeper · altar-keeper · buyer · vip |
| Platform Source | Single select | TikTok · Facebook · Instagram · YouTube · Pinterest · Organic · Affiliate · Direct · Email |
| Purchases | Link to another record | Links to Sales Log — any purchases by this contact |
| Total Spent | Rollup | Rollup from Purchases · Sum of Amount |
| Patreon Member | Checkbox | |
| Magnolia Circle (Stan) | Checkbox | |
| Buyer | Checkbox | Has at least one purchase |
| Notes | Long text | |
| Last Engaged | Date | Manual — date of last open, click, or reply |

### Views

1. **All Contacts — Active** — Grid · filter: Status = Active · sort by Subscribed Date desc
2. **Buyers** — Grid · filter: Buyer = checked
3. **Patreon Members** — Grid · filter: Patreon Member = checked
4. **Magnolia Circle** — Grid · filter: Magnolia Circle (Stan) = checked
5. **Freebie Only** — Grid · filter: Tags contains "freebie" · Buyer = unchecked · (these people to nurture toward purchase)
6. **By Source** — Grid · grouped by Platform Source
7. **High Value** — Grid · filter: Total Spent >= $47 · sort by Total Spent desc

---

## TABLE 5 — Affiliate Pipeline

Create a table named **Affiliate Pipeline**.

> Field names here match the Make.com M-01 and M-03 automation schemas exactly.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Partner Name | Single line text | **Primary field** |
| Category | Single select | ND Creator · WOC Wellness · Recovery · Genealogy · ADHD · Sober-Curious · Dropship · Literary |
| Tier | Single select | Tier 1 (9–10) · Tier 2 (7–8) · Tier 3 (5–6) |
| Fit Score | Number | 1–10 |
| Outreach Status | Single select | Not Started · Email Drafted · Sent · Replied · Partner · Declined · On Hold |
| Contact Email | Email | |
| Platform URL | URL | Their website or social profile |
| Contact Method | Single select | Email · Instagram DM · Facebook · Twitter/X · LinkedIn |
| Commission Rate | Percent | e.g. 20%, 30%, 40% |
| Commission Owed | Currency | Running total — updated by M-03 automation |
| Revenue Generated | Currency | Total sales attributed to this partner — updated by M-03 |
| Units Referred | Number | Total units sold via this partner |
| Outreach Date | Date | When email was sent |
| Follow-up Date | Date | When to follow up if no reply |
| Last Sale Date | Date | Most recent affiliate-attributed sale |
| Email Template Used | Single select | Custom Tier 1 · Custom Tier 2 · Universal Tier 3 · Genealogy · Recovery · ND Creator |
| Outreach Email Draft | Long text | Paste the outreach email draft here before sending |
| Audience Size | Single line text | Approximate — e.g. "45K Instagram followers" |
| Notes | Long text | |
| Airtable Record ID | Single line text | Auto-populated by Make M-01 for sync reference |
| Added | Created time | Auto |

### Pre-populate Tier 1 partners

| Partner Name | Category | Tier | Fit Score | Contact Email |
|---|---|---|---|---|
| Neurodivergent Rebel | ND Creator | Tier 1 | 10 | Via neurodivergentrebel.com/contact |
| Balanced Black Girl | WOC Wellness | Tier 1 | 9 | info@balancedblackgirl.com |
| Neurodivergent Insights (Dr. Neff) | ND Creator | Tier 1 | 9 | Via neurodivergentinsights.com/contact |
| Useful Planner / Plannerlover | ADHD | Tier 1 | 9 | Via plannerlover.gumroad.com/affiliates |
| Learning for a Purpose | ND Creator | Tier 1 | 9 | Via learningforapurpose.com |
| Sober Black Girls Club | Recovery | Tier 1 | 9 | info@soberblackgirlsclub.com |
| Served Up Sober | Recovery | Tier 2 | 8 | servedupsober.com/contact |
| The Luckiest Club (Laura McKowen) | Recovery | Tier 2 | 8 | theluckiestclub.com/contact |
| Reflection.app | ND Creator | Tier 2 | 8 | Via reflection.app |
| Ancestry.com | Genealogy | Tier 2 | 8 | Via Partnerize |
| MyHeritage | Genealogy | Tier 2 | 8 | Via Impact / Awin |
| GenealogyBank | Genealogy | Tier 2 | 7 | genealogybank.com/affiliate |
| FamilyTreeDNA | Genealogy | Tier 2 | 7 | Via familytreedna.com |
| The Sober Curator | Recovery | Tier 2 | 7 | thesobercurator.com/contact |
| Enchanted Soul | Dropship | Tier 2 | 8 | enchantedsoul.store/pages/dropshipping |
| Printful | Dropship | Tier 2 | 7 | Via printful.com |
| Starlinks Gifts | Dropship | Tier 2 | 7 | Via wholesale application |

### Views

1. **Priority Outreach** — Grid · filter: Tier = Tier 1 · Outreach Status = Not Started · sort by Fit Score desc
2. **Active Partners** — Grid · filter: Outreach Status = Partner
3. **Follow-up Due** — Grid · filter: Follow-up Date <= today · Outreach Status = Sent
4. **Genealogy Partners** — Grid · filter: Category = Genealogy
5. **Recovery Partners** — Grid · filter: Category = Recovery
6. **Dropship Partners** — Grid · filter: Category = Dropship
7. **Revenue by Partner** — Grid · sort by Revenue Generated desc
8. **Pipeline Board** — Kanban · grouped by Outreach Status

---

## TABLE 6 — Patreon Members

Create a table named **Patreon Members**.

> ⚠ Patreon is currently locked (email latisha@midnight-magnolia.com inaccessible).
> Build this table now so it's ready when access is restored.
> Populate manually from Patreon dashboard once access is recovered.
> Automations P-01 and P-02 will keep this in sync going forward.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Member Name | Single line text | **Primary field** |
| Patreon Email | Email | |
| Tier | Single select | Candle Tender ($5) · Circle Keeper ($15) · Altar Keeper ($35) |
| Join Date | Date | |
| Status | Single select | Active · Churned · Paused · Pending |
| Months Active | Number | Track tenure — update monthly |
| Altar Keeper Slot | Number | 1–10 ONLY for Altar Keeper tier · never exceed 10 |
| Last Content Delivered | Date | When did you last deliver their tier content? |
| Last Session Date | Date | Altar Keeper only — quarterly 1:1 |
| Next Session Due | Date | Altar Keeper only — 3 months after Last Session Date |
| Preferred Themes | Long text | What healing themes resonate for this member? |
| Notes | Long text | Session notes, feedback, preferences |
| Contact Link | Link to another record | Links to Contacts table — if they're also an email subscriber |
| Platform | Single select | Patreon · Stan Store (Magnolia Circle) · BMAC |

### Views

1. **Active Members** — Grid · filter: Status = Active · sort by Join Date
2. **Altar Keeper Roster** — Grid · filter: Tier = Altar Keeper (35) · Status = Active
   > ⚠ Airtable views cannot enforce hard row limits.
   > Enforce the 10-member cap with an Airtable Automation (or app-level validation) that blocks setting Status = Active when active Altar Keeper count is already 10.
   > Keep this view for visibility only, and still review changes whenever a new Altar Keeper is added.
3. **Content Due** — Grid · filter: Status = Active · sort by Last Content Delivered asc
   (oldest delivery first = most overdue)
4. **Churned Members** — Grid · filter: Status = Churned · sort by Join Date desc
5. **By Tier** — Kanban · grouped by Tier
6. **Altar Keeper Sessions** — Grid · filter: Tier = Altar Keeper · sort by Next Session Due

---

## TABLE 7 — Member Content Tracker

Create a table named **Member Content Tracker**.

> This is the table that feeds Make.com automation P-03 —
> the monthly reminder sent on the 25th of every month.
> Create a new batch of records at the start of each month.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Deliverable Title | Single line text | **Primary field** · e.g. "June — Candle Tender Note" |
| Tier | Single select | Candle Tender · Circle Keeper · Altar Keeper · All Tiers |
| Platform | Single select | Patreon · Stan Store · Email · BMAC |
| Month | Single line text | e.g. "June 2026" |
| Theme | Single line text | Monthly healing theme — e.g. "Grief as a Practice" |
| Content Type | Single select | Written Note · Audio Ritual · Session Outline · Bonus Resource · Video |
| Due Date | Date | Always 1st of the month |
| Status | Single select | Not Started · Drafting · Recorded · Scheduled · Published · Late |
| Word Count / Duration | Single line text | e.g. "520 words" or "12 min" |
| Notion Draft Link | URL | Link to Notion drafting page |
| Repurposed From | Single line text | Note spiritual practice entry or other source if repurposed |
| Published URL | URL | Live Patreon or Stan Store post URL once published |
| Member Feedback | Long text | Any responses or reactions from members |

### Monthly content minimum requirements
- Candle Tender: Written reflection note (~500 words)
- Circle Keeper: Above + audio ritual (10–15 min)
- Altar Keeper: Above + quarterly 1:1 session outline

> A written reflection always counts when you cannot record audio.

### Views

1. **Current Month** — Grid · filter: Month = current month · sort by Due Date
2. **Not Started** — Grid · filter: Status = Not Started · sort by Tier
3. **Late** — Grid · filter: Status = Late — check this first on the 1st of each month
4. **All Time Archive** — Grid · sort by Due Date desc · all records
5. **By Theme** — Grid · grouped by Theme

---

## TABLE 8 — Monthly Revenue Log

Create a table named **Monthly Revenue Log**.

> Populated by Make.com automation M-04 on the 1st of each month.
> Also manually add Patreon total (separate from Stan Store) until Patreon is restored.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Month | Single line text | **Primary field** · e.g. "May 2026" |
| Stan Store Revenue | Currency | From M-04 Sales Log rollup |
| Patreon Revenue | Currency | Manual until automation restored |
| Gumroad Revenue | Currency | |
| KDP Royalties | Currency | Check monthly in KDP dashboard |
| Other Revenue | Currency | Printify, Etsy, etc. |
| Total Revenue | Formula | `Stan Store Revenue + Patreon Revenue + Gumroad Revenue + KDP Royalties + Other Revenue` |
| New Subscribers | Number | New email subscribers that month |
| Active Patreon Members | Number | |
| Active Magnolia Circle | Number | Stan Store subscribers |
| New Products Launched | Number | |
| Goal ($4,000/mo) | Currency | Static: $4000 |
| Gap to Goal | Formula | `Goal ($4,000/mo) - Total Revenue` |
| % of Goal | Formula | `Total Revenue / Goal ($4,000/mo)` — format as percent |
| Top Performing Product | Single line text | Manual — which product sold most this month |
| Top Traffic Source | Single line text | Manual — where did buyers come from |
| Reflection | Long text | Monthly note — what worked, what to improve |

### Views

1. **Revenue History** — Grid · sort by Month desc
2. **Goal Tracking** — Grid · show: Month, Total Revenue, Goal, Gap to Goal, % of Goal
3. **Growth Chart** — if Airtable chart extension available: line chart of Total Revenue by Month

---

## TABLE 9 — Social Links Registry

Create a table named **Social Links Registry**.

> Canonical source of truth for all platform handles and URLs.
> When you update a handle anywhere, update it here first.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Platform | Single line text | **Primary field** |
| Handle / Username | Single line text | |
| Full URL | URL | |
| Status | Single select | Live · Locked · Planned · Inactive |
| Role in Funnel | Single select | Discovery · Conversion · Depth · Membership · Sales · Owned Audience · Professional · Support |
| Followers / Subscribers | Number | Update monthly |
| Bio Last Updated | Date | |
| Link in Bio Points To | URL | Current link-in-bio destination |
| Profile Photo Status | Single select | Set · Needs Update · Not Set |
| Priority | Single select | Core · High · Medium · Low · Later |
| Notes | Long text | |

### Pre-populate with confirmed handles

| Platform | Handle | URL | Status | Role |
|---|---|---|---|---|
| Website | midnightmagnolia.com | https://midnightmagnolia.com | Live | Conversion |
| Instagram (brand) | @noirmagnoliasc | https://instagram.com/noirmagnoliasc | Live | Discovery |
| Instagram (personal) | @latishaimara | https://instagram.com/latishaimara | Live | Discovery |
| TikTok | @latishaimara6 | https://tiktok.com/@latishaimara6 | Live | Discovery |
| Facebook (brand page) | /midnightmagnoliasc | https://facebook.com/midnightmagnoliasc | Live | Conversion |
| Facebook (personal) | /latisha.imara843 | https://facebook.com/latisha.imara843 | Live | Personal |
| YouTube | @poetrygirl1013 | https://youtube.com/@poetrygirl1013 | Live | Depth |
| Patreon | /MidnightMagnoliaSC | https://patreon.com/MidnightMagnoliaSC | Locked | Membership |
| Stan Store | MidnightMagnoliaSC | https://stan.store/MidnightMagnoliaSC | Live | Sales |
| Gumroad | midnightmagnoliasc | https://midnightmagnoliasc.gumroad.com | Live | Sales |
| Substack / Dusk Letters | midnightmagnoliasc | https://midnightmagnoliasc.substack.com | Live | Owned Audience |
| Tumblr | midnight-magnoliasc | https://tumblr.com/blog/midnight-magnoliasc | Live | Depth |
| X / Twitter | @bgconscious | https://x.com/bgconscious | Live | Low Priority |
| LinkedIn | /in/latishavwaters | https://linkedin.com/in/latishavwaters | Live | Professional |
| GitHub | Rumi1013 | https://github.com/Rumi1013 | Live | Professional |
| Soros Justice Fellow | N/A | https://opensocietyfoundations.org/fellows/latisha-vincent | Live | Professional |
| BMAC | TBD | TBD | Live | Support |
| Pinterest | TBD | TBD | Planned | Discovery |
| Etsy | TBD | TBD | Planned | Sales |
| KDP Author Page | TBD | TBD | Planned | Sales |

### Views

1. **Core Platforms** — Grid · filter: Priority = Core
2. **Needs Attention** — Grid · filter: Profile Photo Status = Needs Update OR Bio Last Updated < 90 days ago
3. **Locked / Planned** — Grid · filter: Status = Locked or Planned
4. **By Role** — Grid · grouped by Role in Funnel

---

## AUTOMATIONS — MIDNIGHT MAGNOLIA OPERATIONS

### Automation 1 — New Stan Store Sale → Sales Log
**Trigger:** Webhook from Zapier Z-01
**Action:** Create record in Sales Log
**Fields:** Product Name, Sale Date, Amount, Platform = "Stan Store", Source from UTM

### Automation 2 — New Subscriber → Contacts
**Trigger:** Webhook from Zapier Z-02
**Action:** Create or update record in Contacts (match on Email)
**Fields:** Email, First Name, Subscribed Via, Subscribed Date, Tags, Platform Source

### Automation 3 — Affiliate Outreach Status → "Partner" → Notify
**Trigger:** When Outreach Status changes to "Partner" in Affiliate Pipeline
**Action:** Send email to bgconscious@gmail.com
**Subject:** "✦ New affiliate partner: {Partner Name}"
**Body:** Include Partner Name, Category, Commission Rate, Contact Email, and reminder to connect them to Make M-01 for welcome email flow

### Automation 4 — Altar Keeper count warning
**Trigger:** When a record in Patreon Members is updated with Tier = "Altar Keeper ($35)" and Status = "Active"
**Action:** Count active Altar Keeper records
**Condition:** If count > 10 → send alert email to bgconscious@gmail.com
**Subject:** "⚠ Altar Keeper limit: check roster immediately"

### Automation 5 — Monthly Revenue Log entry (1st of month)
**Trigger:** Scheduled · 1st of each month at 9:00 AM ET
**Action:** Create new record in Monthly Revenue Log with Month = current month
> Zapier/Make M-04 will fill in the financial fields; this creates the shell.

### Automation 6 — Content published → flag for repurpose
**Trigger:** When Content Calendar record Status changes to "Published"
**Action:** If Repurpose To field is not empty → send email to bgconscious@gmail.com
**Subject:** "🌙 Repurpose queue: {Title}"
**Body:** "Published: {Title} · Repurpose to: {Repurpose To} · Original URL: {Copy URL}"

### Automation 7 — Monthly content batch reminder (25th)
**Trigger:** Scheduled · 25th of each month · 9:00 AM ET
**Action:** Search Member Content Tracker where Status = Not Started AND Month = next month
**Send email:** to bgconscious@gmail.com listing all unstarted deliverables
> This mirrors Make P-03 — run both as a redundancy check.

---

## INTERFACE — MIDNIGHT MAGNOLIA DASHBOARD

Create an Airtable Interface named **MM Operations Center** with these pages:

### Page 1 — Revenue & Growth (Home)
- Stat blocks: This Month Revenue (from Monthly Revenue Log), Active Subscribers (Contacts where Status = Active), Active Members (Patreon + Magnolia Circle), Products Live
- Record list: Sales Log — last 10 sales
- Record list: Monthly Revenue Log — last 6 months

### Page 2 — Products & Build Queue
- Record list: Products where Live = unchecked, sorted by Priority
- Record list: Content Calendar where Status = Idea or Drafting, sorted by Publish Date

### Page 3 — Audience
- Stat blocks: Total Active Contacts, Buyers, Patreon Members, Magnolia Circle Members
- Record list: Contacts — last 20 added

### Page 4 — Affiliate Pipeline
- Kanban: Affiliate Pipeline grouped by Outreach Status
- Record list: Partners where Outreach Status = Partner (active partners)

### Page 5 — Member Content Status
- Record list: Member Content Tracker — current month, sorted by Tier
- Record list: Member Content Tracker — Late status (visible at top as warning)

### Page 6 — Add Content Idea (form)
- Form for quick-capture: Title, Content Type, Content Pillar, Energy Required, Hook/Opening Line, Linked Product
- Submits to Content Calendar with Status = Idea

### Page 7 — Log a Sale (form)
- Form: Product (linked), Amount, Platform, Source
- Submits to Sales Log

---

---

# BASE 2 — CAREER COMMAND

Create a base named: **Career Command**
Workspace: Midnight Magnolia / Rumi-Nations LLC
Color: Indigo (#2B2F4A)
Icon: Briefcase or star

This base tracks the parallel job search targeting $100K+ remote roles
in AI Enablement and digital transformation, alongside the IAAM archivist
application and the long-term MLIS degree path.

---

## TABLE 1 — Job Applications

Create a table named **Job Applications**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Role Title | Single line text | **Primary field** |
| Company | Single line text | |
| Track | Single select | A: AI Enablement · B: Implementation PM · C: Digital Learning · D: Program Management · E: Ops/Compliance · IAAM/Archive · MLIS/Academic |
| Salary Min | Currency | |
| Salary Max | Currency | |
| Remote | Checkbox | |
| Location | Single line text | City/state if not remote |
| Status | Single select | Researching · Applied · Phone Screen · Interview · Final Round · Offer · Rejected · Withdrawn · On Hold |
| Applied Date | Date | |
| Deadline | Date | Application deadline if known |
| Resume Version | Single select | Track A · Track B · Track C · Track D · Track E · IAAM Custom · Claflin/MLIS · General |
| Cover Letter | Checkbox | Was a cover letter required / submitted? |
| Job Posting URL | URL | |
| Company Website | URL | |
| Match Score | Rating | 1–5 stars · personal alignment assessment |
| Key Requirements | Long text | Top 3–5 things they're looking for |
| Impact Metrics Used | Long text | Which of your verified metrics did you highlight? |
| Follow-up Date | Date | Set to +7 days from Applied Date via Zapier Z-04 |
| Recruiter Name | Single line text | |
| Recruiter Email | Email | |
| Interview Notes | Long text | Prep notes and debrief notes |
| Offer Details | Long text | Salary, benefits, start date if offer received |
| Decision | Single select | Accepted · Declined · Negotiating |
| Notes | Long text | |

### Key impact metrics to use across applications
Copy these verified figures into Impact Metrics Used as appropriate:
- 610+ participants across 11 programs in 4 counties
- $1.5M+ in secured funding
- $300K+ annual budget managed
- 25% cost reduction achieved
- Soros Justice Fellow
- HBCU graduate (Claflin University, B.A. Mass Communications)
- AAS Information Technology in progress, GPA 3.58, expected 2026

### Views

1. **Active Pipeline** — Kanban · grouped by Status
2. **Applied — Awaiting Response** — Grid · filter: Status = Applied · sort by Applied Date
3. **$100K+ Remote** — Grid · filter: Salary Min >= 100000 · Remote = checked · Status ≠ Rejected, Withdrawn
4. **IAAM / Archive Track** — Grid · filter: Track = IAAM/Archive
5. **Follow-up Due** — Grid · filter: Follow-up Date <= today · Status = Applied or Phone Screen
6. **High Match** — Grid · filter: Match Score >= 4
7. **All Applications** — Grid · sort by Applied Date desc

---

## TABLE 2 — Resume Vault

Create a table named **Resume Vault**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Version Name | Single line text | **Primary field** · e.g. "Track A — AI Enablement v3" |
| Track | Single select | A: AI Enablement · B: Implementation PM · C: Digital Learning · D: Program Mgmt · E: Ops/Compliance · IAAM Custom · General |
| Version Number | Single line text | v1, v2, v3 etc. |
| Last Updated | Date | |
| Target Role Type | Single line text | e.g. "Senior PM, AI Enablement $125K+" |
| Key Differentiators | Long text | What makes this version stand out for this track |
| File URL | URL | Google Drive or local path |
| Cover Letter Template | URL | Companion cover letter file |
| Status | Single select | Active · Archived · Draft |
| Used For Applications | Link to another record | Links to Job Applications |
| Notes | Long text | What was changed from previous version, why |

### Pre-populate tracks
| Version Name | Track | Target Role |
|---|---|---|
| Track A — AI Enablement | A: AI Enablement | Senior PM, AI Enablement $125K+ |
| Track B — Implementation PM | B: Implementation PM | Implementation / Onboarding PM |
| Track C — Digital Learning | C: Digital Learning | Digital Learning / Curriculum PM |
| Track D — Program Management | D: Program Management | Program / Project Manager |
| Track E — Ops / Compliance | E: Ops/Compliance | Operations / Compliance Manager |
| IAAM Custom | IAAM/Archive | Center for Family History Archivist |
| Claflin / MLIS | MLIS/Academic | Graduate school applications |

---

## TABLE 3 — MLIS Research

Create a table named **MLIS Research**.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Program Name | Single line text | **Primary field** |
| Institution | Single line text | |
| Degree | Single line text | e.g. "M.L.I.S." or "M.L.I.S. + M.A. Public History (dual)" |
| ALA Accredited | Checkbox | |
| HBCU | Checkbox | |
| Concentration Available | Multiple select | Digital Archives · Cultural Heritage · Public History · Genealogy · Library Science · Information Technology |
| Format | Single select | Online · Hybrid · In-Person |
| In-State Tuition | Checkbox | SC residency applies |
| Application Deadline | Date | |
| Status | Single select | Researching · Shortlisted · Applied · Accepted · Deferred · Not Pursuing |
| Program URL | URL | |
| Notes | Long text | Pros/cons, fit with archival science and genealogy focus |
| Priority | Single select | Top Choice · Strong Option · Backup · Not Pursuing |

### Pre-populate
| Program | Institution | Notes | Priority |
|---|---|---|---|
| M.L.I.S. — Archives & Records | North Carolina Central University (NCCU) | Only ALA-accredited HBCU program nationally. Online options available. Primary recommendation. | Top Choice |
| M.L.I.S. + M.A. Public History (dual) | University of South Carolina Columbia | SC in-state tuition. Dual track = strongest fit for cultural heritage + archival science. | Top Choice |
| M.L.I.S. | University of North Carolina Chapel Hill | ALA-accredited, strong archival program | Strong Option |
| M.S. Library & Information Science | Florida State University | Online, ALA-accredited | Strong Option |

---

## TABLE 4 — Academic Tracker

Create a table named **Academic Tracker** for current coursework at Trident Technical College.

### Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| Course | Single line text | **Primary field** · e.g. "CPT 262 — Database Administration" |
| Course Code | Single line text | |
| Semester | Single select | Spring 2026 · Summer 2026 · Fall 2026 |
| Credits | Number | |
| Grade | Single select | A · B · C · D · F · W · In Progress |
| Completion Status | Single select | In Progress · Complete · Registered · Planned |
| Certificate Requirement | Checkbox | Required for DB Admin certificate? |
| Notes | Long text | Key topics, assignments, career connection |
| Related Career Track | Single select | Database Administration · Information Technology · General |

### Pre-populate known courses
| Course | Code | Certificate Req | Status |
|---|---|---|---|
| Database Administration | CPT 262 | Yes | In Progress |
| Advanced Database | CPT 187 | Yes | Planned |
| Data Analytics | CPT 180 | Yes | Planned |
| Java Programming | (code TBD) | No | In Progress |
| Python Programming | (code TBD) | No | Planned |

---

## AUTOMATIONS — CAREER COMMAND

### Automation 1 — New application → set follow-up date
**Trigger:** When record is created in Job Applications
**Condition:** Status = Applied
**Action:** Set Follow-up Date = Applied Date + 7 days
> Also handled by Zapier Z-04 — run both as redundancy.

### Automation 2 — Application status changes to Interview
**Trigger:** When Status changes to Interview or Final Round
**Action:** Send email to bgconscious@gmail.com
**Subject:** "✦ Interview stage: {Role Title} at {Company}"
**Body:** Include Job Posting URL, Key Requirements, Follow-up Date

### Automation 3 — Offer received
**Trigger:** When Status changes to Offer
**Action:** Send email to bgconscious@gmail.com
**Subject:** "🌙 Offer received: {Role Title} at {Company}"
**Body:** Include Offer Details, Salary Min/Max, Decision field reminder

### Automation 4 — Weekly follow-up digest (Monday 9 AM)
**Trigger:** Scheduled · Every Monday at 9:00 AM ET
**Action:** Search Job Applications where Follow-up Date <= today AND Status = Applied or Phone Screen
**Send email:** to bgconscious@gmail.com with list of applications needing follow-up

---

## INTERFACE — CAREER COMMAND CENTER

Create an Airtable Interface named **Career Command Center** with these pages:

### Page 1 — Pipeline Overview
- Stat blocks: Total Applications, In Active Pipeline (not Rejected/Withdrawn), Interviews Scheduled, Offers
- Kanban: Job Applications grouped by Status

### Page 2 — $100K+ Remote Roles
- Filtered grid: Salary Min >= $100K · Remote = checked · Status ≠ Rejected/Withdrawn

### Page 3 — IAAM / Archive
- Filtered grid: Track = IAAM/Archive
- Notes section: IAAM Center for Family History context, application notes

### Page 4 — Resume Vault
- Record list: Resume Vault — all active versions

### Page 5 — MLIS Path
- Record list: MLIS Research sorted by Priority
- Record list: Academic Tracker — In Progress courses

### Page 6 — Add Application (form)
- Form fields: Role Title, Company, Track, Salary Min/Max, Remote, Job Posting URL, Match Score, Applied Date
- Submits to Job Applications with Status = Applied

---

---

# CROSS-BASE CONNECTIONS

Once both bases are built, connect them through Zapier and Make.com
as documented in the MM Canonical Master Plan automations:

| Automation | Trigger Base | Action Base | Schema |
|---|---|---|---|
| Z-01 — Purchase → Sales Log | External (Stan Store) | MM Operations | Stan Store webhook → Sales Log |
| Z-02 — Subscriber → Contacts | External (Email platform) | MM Operations | New sub → Contacts (match on email) |
| Z-04 — Application follow-up | Career Command | Career Command | New row → Follow-up Date +7 days |
| P-01 — Patreon pledge | External (Patreon) | MM Operations | New pledge → Patreon Members |
| P-02 — Patreon churn | External (Patreon) | MM Operations | Deleted pledge → Status = Churned |
| M-01 — Affiliate onboarded | MM Operations | External (Gmail) | Status → Partner → welcome email |
| M-03 — Affiliate sale | MM Operations | MM Operations | Sale with affiliate → commission calc |
| M-04 — Monthly rollup | MM Operations | MM Operations | 1st of month → revenue log |
| M-05 — Genealogy find | External (Form) | MM Operations + Genealogy | Form sub → both bases |

---

# PERMISSIONS & SETTINGS

- Both bases: Editor access for latisha@midnight-magnolia.com
  (use bgconscious@gmail.com until domain email is restored)
- Keep both bases private — no public sharing
- Enable Airtable AI features on all tables for natural language querying
- Connect MM Operations base to Make.com workspace for M-series automations
- Connect Career Command base to Zapier for Z-04 and weekly digest

---

*Built for Midnight Magnolia / Rumi-Nations LLC*
*Latisha Vincent-Waters · Ravenel, South Carolina*
*bgconscious@gmail.com · latishavwaters (LinkedIn) · Rumi1013 (GitHub)*
*Canonical Master Plan v3 · May 2026*
