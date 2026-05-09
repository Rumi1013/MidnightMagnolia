# Airtable Omni Setup Prompt
## Vincent Family Tree — Midnight Magnolia Genealogical Archive

> Paste this entire prompt into Airtable Omni to build the base.
> One section at a time works best — start with Base Setup, then each table.

---

## CONTEXT

I am setting up a genealogy research base called **Vincent Family Tree** inside an Airtable workspace for **Midnight Magnolia / Rumi-Nations LLC**. The data comes from a GEDCOM export from Ancestry.com containing **939 individuals** and **235 families**, heavily concentrated in **North Carolina** (especially Caswell County), with lines extending into southern Virginia and the SC Lowcountry. The primary research focus is the **Vincent and Vinson surname lines**, which represent the same ancestral family — the surname split after Emancipation.

---

## STEP 1 — CREATE THE BASE

Create a new Airtable base named:
**Vincent Family Tree — Midnight Magnolia**

Use the following color scheme in field and view labels where possible:
- Primary accent: **#C9A84C** (Southern Gold)
- Secondary: **#2B2F4A** (Midnight Indigo)
- Highlight color for Vincent/Vinson records: gold / yellow

---

## STEP 2 — TABLE: Individuals

Create a table named **Individuals** with these fields in this exact order:

| Field Name | Field Type | Notes |
|---|---|---|
| Full Name | Single line text | **Primary field** |
| Individual ID | Single line text | GEDCOM ID e.g. I102041602256 |
| Given Name | Single line text | First / middle name(s) |
| Surname | Single line text | Last name only |
| Sex | Single select | Options: Male, Female, Unknown |
| Birth Date | Single line text | Keep as text — dates are inconsistent (e.g. "13 Oct 1982", "Abt 1845") |
| Birth Place | Long text | Full place string from GEDCOM |
| Death Date | Single line text | Text field — same reason as Birth Date |
| Death Place | Long text | Full place string |
| Status | Single select | Options: Deceased, Unknown |
| Birth State | Single line text | Extracted state — e.g. "North Carolina", "Virginia", "South Carolina" |
| Birth County | Single line text | County if identifiable — e.g. "Caswell County" |
| Is Vincent Line | Checkbox | Check if Surname = Vincent or Vinson |
| Is Caswell County | Checkbox | Check if Birth Place contains "Caswell" |
| Child of Family | Single line text | Family ID they were born into |
| Spouse Families | Single line text | Family ID(s) as spouse — pipe-separated if multiple |
| Residence Notes | Long text | Historical residences from GEDCOM RESI records |
| Research Notes | Long text | Your notes, source citations, open questions |
| Ancestry URL | URL | Link to Ancestry.com profile if available |
| Last Updated | Last modified time | Auto |

### Views to create for Individuals:
1. **All — Alphabetical** (Grid, sorted by Surname A→Z then Given Name A→Z)
2. **Vincent · Vinson Line** (Grid, filter: Is Vincent Line = checked, sorted by Birth Date oldest first)
3. **Caswell County** (Grid, filter: Is Caswell County = checked)
4. **North Carolina Born** (Grid, filter: Birth State = "North Carolina")
5. **South Carolina Born** (Grid, filter: Birth State = "South Carolina")
6. **Unknown Status** (Grid, filter: Status = Unknown — living individuals to verify)
7. **Gallery — Portrait View** (Gallery grouped by Surname, for visual browsing)
8. **By Birth Century** (Grid, grouped by a formula field — see note below)

---

## STEP 3 — TABLE: Families

Create a table named **Families** with these fields:

| Field Name | Field Type | Notes |
|---|---|---|
| Family ID | Single line text | **Primary field** — GEDCOM FAM ID e.g. F121 |
| Husband Name | Single line text | |
| Husband ID | Single line text | Links to Individuals.Individual ID |
| Wife Name | Single line text | |
| Wife ID | Single line text | Links to Individuals.Individual ID |
| Marriage Date | Single line text | Text — GEDCOM dates inconsistent |
| Marriage Place | Long text | |
| Divorce Date | Single line text | If applicable |
| Children Count | Number | Integer |
| Children Names | Long text | Pipe-separated list of children's full names |
| Children IDs | Long text | Pipe-separated list of Individual IDs |
| Is Vincent Family | Checkbox | Check if either parent has Vincent/Vinson surname |
| Research Notes | Long text | |
| Husband Link | Link to another record | Link to Individuals table — match on Husband ID |
| Wife Link | Link to another record | Link to Individuals table — match on Wife ID |

### Views to create for Families:
1. **All Families — by Marriage Date** (Grid, sorted by Marriage Date)
2. **Vincent · Vinson Families** (Grid, filter: Is Vincent Family = checked)
3. **Large Families** (Grid, filter: Children Count >= 5, sorted by Children Count descending)
4. **Families with Marriage Records** (Grid, filter: Marriage Date is not empty)

---

## STEP 4 — TABLE: Surnames

Create a table named **Surnames** with these fields:

| Field Name | Field Type | Notes |
|---|---|---|
| Surname | Single line text | **Primary field** |
| Count | Number | Number of individuals with this surname |
| Research Priority | Single select | Options: Primary, Allied, Background, Unknown |
| Notes | Long text | Research notes about this surname line |
| Geographic Origin | Single line text | Known origin region |
| Related Surnames | Single line text | Known variants or connected surnames |
| Linked Individuals | Link to another record | Link to Individuals table |

Pre-populate with these high-priority surnames and their research priority:

| Surname | Count | Priority | Notes |
|---|---|---|---|
| Phifer | 91 | Allied | Most frequent surname in tree — significant allied family |
| Vincent | 77 | **Primary** | Primary research line — Caswell Co NC origin |
| Graves | 57 | Allied | Allied family line |
| Turner | 56 | Allied | Allied family line |
| Sellars | 39 | Allied | Allied family line |
| Thompson | 38 | Allied | Allied family line |
| Bigelow | 25 | Allied | Allied family line |
| Cunningham | 24 | Allied | Allied family line |
| Hurdle | 23 | Allied | Allied family line |
| Mitchell | 22 | Allied | Allied family line |
| Vinson | (part of Vincent count) | **Primary** | VINCENT variant — post-Emancipation surname split; same ancestral line |

---

## STEP 5 — TABLE: Research Log

Create a table named **Research Log** with these fields:

| Field Name | Field Type | Notes |
|---|---|---|
| Finding Title | Single line text | **Primary field** — e.g. "Samuel L. Vincent — 1910 Census Caswell Co" |
| Date Found | Date | When you found this record |
| Record Type | Single select | Options: Census, Death Certificate, Birth Record, Marriage Record, Newspaper, DNA Match, Land Record, Military Record, Church Record, Photograph, Oral History, Other |
| Individual(s) | Link to another record | Link to Individuals — who does this record relate to? |
| Family | Link to another record | Link to Families — if applicable |
| Source Name | Single line text | e.g. "1910 US Federal Census" |
| Source URL | URL | Ancestry, FamilySearch, Newspapers.com etc. |
| Year of Record | Number | Year the record was created (not found) |
| Location | Single line text | Where the record originates |
| Key Facts Found | Long text | What did you learn? |
| Open Questions | Long text | What does this raise that still needs research? |
| Content Potential | Single select | Options: High, Medium, Low, None — can this become content for Midnight Magnolia? |
| Published As | Single line text | If turned into blog post, journal prompt, or Dusk Letters essay — note here |
| Verified | Checkbox | Has this finding been cross-referenced with another source? |

### Views to create for Research Log:
1. **All Findings — by Date Found** (Grid, newest first)
2. **Vincent / Vinson Findings** (Grid, filter: linked individual has Is Vincent Line = checked)
3. **Caswell County Records** (Grid, filter: Location contains "Caswell")
4. **High Content Potential** (Grid, filter: Content Potential = High — findings to turn into essays or prompts)
5. **Unverified** (Grid, filter: Verified = unchecked — open research items)
6. **By Record Type** (Grid, grouped by Record Type)

---

## STEP 6 — TABLE: Geographic Index

Create a table named **Geographic Index** with these fields:

| Field Name | Field Type | Notes |
|---|---|---|
| Place Name | Single line text | **Primary field** — e.g. "Caswell County, NC" |
| State | Single line text | |
| County | Single line text | |
| Country | Single line text | Default: USA |
| Region | Single select | Options: NC Piedmont, SC Lowcountry, Southern Virginia, Mid-Atlantic, Midwest, Unknown |
| Individual Count | Number | How many individuals in this tree were born here |
| Research Significance | Single select | Options: High, Medium, Low |
| Notes | Long text | Historical context, migration patterns, archives available |
| Linked Individuals | Link to another record | Link to Individuals |

Pre-populate key places:
- Caswell County, North Carolina (High significance — primary Vincent origin)
- Guilford County, North Carolina
- Rowan County, North Carolina
- Iredell County, North Carolina
- Greensboro, Guilford, North Carolina
- South Carolina Lowcountry (High significance — current family location)
- Southern Virginia (Medium — migration corridor)

---

## STEP 7 — AUTOMATIONS TO CREATE

### Automation 1: Flag Vincent / Vinson records
**Trigger:** When a record is created or updated in Individuals
**Condition:** Surname field contains "Vincent" OR "Vinson"
**Action:** Set Is Vincent Line checkbox = true

### Automation 2: Flag Caswell County records
**Trigger:** When a record is created or updated in Individuals
**Condition:** Birth Place field contains "Caswell"
**Action:** Set Is Caswell County checkbox = true

### Automation 3: Research Log → Notify for high content potential
**Trigger:** When Research Log record is updated
**Condition:** Content Potential = "High" AND Published As is empty
**Action:** Send email to bgconscious@gmail.com
**Email subject:** "🌙 New genealogy finding ready for content: {Finding Title}"
**Email body:** Include Key Facts Found, Source URL, and link to record

### Automation 4: Flag Vincent families
**Trigger:** When a record is created or updated in Families
**Condition:** Husband Name contains "Vincent" OR "Vinson" OR Wife Name contains "Vincent" OR "Vinson"
**Action:** Set Is Vincent Family checkbox = true

---

## STEP 8 — INTERFACE / DASHBOARD

Create an Airtable Interface named **Genealogy Command Center** with:

**Page 1 — Summary Dashboard**
- Stat blocks: Total Individuals (939), Total Families (235), Vincent/Vinson Individuals (86), Caswell County Records
- Record list: Recent Research Log entries (last 10)
- Record list: Unverified findings (Research Log where Verified = false)

**Page 2 — Vincent · Vinson Research**
- Filtered record list: Individuals where Is Vincent Line = checked
- Filtered record list: Research Log entries linked to Vincent/Vinson individuals
- Map view of birth places (if Airtable Maps block available)

**Page 3 — Add Research Finding**
- Form to quickly add a new Research Log record
- Fields: Finding Title, Record Type, Individual(s), Source URL, Year, Location, Key Facts Found, Content Potential

---

## IMPORT NOTES

When importing from the Excel spreadsheet (Vincent_Family_Tree_MM.xlsx):
- Import **All Individuals** sheet → Individuals table
- Import **All Families** sheet → Families table
- Import **Surnames** sheet → Surnames table
- Import **Geography** sheet → Geographic Index table (rename columns to match)
- After import, run Automations 1 and 2 manually on all existing records to backfill the Vincent Line and Caswell County checkboxes
- Birth Date and Death Date should be imported as **Single line text** — do not use Airtable Date field type, as GEDCOM dates use formats like "Abt 1845", "Bef 1900", "13 Oct 1982" that a date field cannot handle

---

## BASE PERMISSIONS

- Set base to **Editor access** for Latisha Vincent-Waters (bgconscious@gmail.com)
- Keep base **private** (not shared publicly)
- Connect to Zapier for the M-05 automation (genealogy find → Notion + Airtable log) documented in the MM Canonical Master Plan

---

*Base created for Midnight Magnolia / Rumi-Nations LLC · Latisha Vincent-Waters · Ravenel, SC*
*Part of the IAAM (International African American Museum) Center for Family History research infrastructure*
