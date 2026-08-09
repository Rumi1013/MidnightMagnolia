# Inventory Gap Report

_Generated: 2026-05-14T04:06:06.983Z_
_Auth: API key (authenticated)_

## Counts

| Source | Count |
|---|---|
| Products (Wix Stores) | 9 |
| Services (Wix Bookings) | 9 |
| Digital Grimoire (CMS) | 5 |

## Rendering check

| Page | Items in API | Rendered on page | Missing |
|---|---|---|---|
| /shop | 9 | n/a (page not reached) | Utility backpack, Utility crossbody bag, Round mouse pad, Spiral bound journal, The Gentle Beginning — Free Shadow Work Starter, Shadow Work Starter Kit, Ancestral Healing Journal, Creative Foundations Workbook, Deep Roots Shadow Work System |
| /services | 9 | n/a | Creative Direction Session, WhollyInspired Publishing Package, Free 15-Minute Publishing Consultation, Manuscript Development, VIP Half-Day Intensive, Notion Sanctuary Setup, KDP Self-Publishing Setup, Book + Journal Bundle Package, Brand Voice Clarity Session |
| /grimoire | 5 | n/a | Lunar Renewal Ritual, Sigil Crafting Template, Astral Travel System, Samhain Celebration Guide, Elemental Balancing Ritual |

## Asset gaps

### Products missing hero image (5)
- The Gentle Beginning — Free Shadow Work Starter
- Shadow Work Starter Kit
- Ancestral Healing Journal
- Creative Foundations Workbook
- Deep Roots Shadow Work System

### Products missing description (0)
_None — all products have descriptions_

### Services missing hero image (5)
- WhollyInspired Publishing Package
- Free 15-Minute Publishing Consultation
- Manuscript Development
- KDP Self-Publishing Setup
- Book + Journal Bundle Package

### Services missing tagline (5)
- WhollyInspired Publishing Package
- Free 15-Minute Publishing Consultation
- Manuscript Development
- KDP Self-Publishing Setup
- Book + Journal Bundle Package

### Services missing description (0)
_None_

## How to import these CSVs

### Airtable Products (existing table)
1. Open the Midnight Operations base
2. Open the **Products** table (`tblA2WPOZgzeGlEji`)
3. Click **+ → Import data → CSV file**
4. Choose `data/inventory-products.csv`
5. Map columns (they should auto-match the existing schema)

### Airtable Services (new table — create it first)
1. In the Midnight Operations base, click **+ Add table → Import a CSV**
2. Choose `data/inventory-services.csv`
3. Name the table **Services**
4. Add to `lib/airtable.js` once column types are confirmed

### Notion Product Build Tracker
1. Open the existing Product Build Tracker DB
2. Use **Import → CSV** with `data/inventory-products.csv`
3. Map columns as needed (Notion uses Product / Price / Status / Priority)

## Next steps

1. Fill in **stock counts** for the 4 physical products (currently shown as IN_STOCK with no quantity)
2. Decide pricing model for **Free 15-Minute Publishing Consultation** (currently has no fixed price)
3. Resolve missing **taglines + descriptions** flagged above (most likely affects `/services` page polish)
4. Make a decision on the 5 **Digital Grimoire** entries: gated freebies, paid, or Magnolia Circle exclusive?
5. Either schedule events on Wix or remove the Events plumbing if not in roadmap (`pages/api/wix/events.js` returns empty)
