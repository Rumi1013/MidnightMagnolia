# Zapier / Make parity checklist

**Source rows:** MM_Canonical_Master_Plan_v3.html (Zapier/Make tab) — recipes **P-01…M-04** and related; plus `files/Airtable_Schema_Automations.html` **Automations** sheet.

For each recipe:

| Column | Meaning |
|--------|---------|
| **Live** | Running in Zapier or Make with healthy auth |
| **Stub** | Zaps exist but need credentials or test data |
| **Next API** | Logic intentionally lives in `pages/api/*` instead of Zapier |
| **Replaced** | Deprecated (e.g. Patreon-first or Stan-first flows superseded by Wix + Gumroad + BMAC) |
| **N/A** | Master Plan row does not apply to current stack |

**Note:** Wix launch → Airtable / Notion / Contacts (**Z-01…Z-03**) takes priority over legacy Patreon (**P-01…P-03**) while Patreon access is limited.

Update this table as you audit each row (date + initials in your commit message is enough).

## Inbound webhook endpoint

Use this endpoint for Zapier/Make webhooks that need to write into Midnight Magnolia tables without exposing dashboard credentials:

`POST https://www.midnight-magnolia.com/api/automations/inbound`

Headers:

```text
Content-Type: application/json
Authorization: Bearer <MM_AUTOMATION_WEBHOOK_SECRET>
```

or:

```text
x-mm-automation-secret: <MM_AUTOMATION_WEBHOOK_SECRET>
```

Supported event: `contact.subscribed`

```json
{
  "event": "contact.subscribed",
  "payload": {
    "email": "reader@example.com",
    "firstName": "Reader",
    "lastName": "Example",
    "source": "Wix Form",
    "tags": ["Free Starter", "Wix Launch"]
  }
}
```

Writes to Airtable Contacts.

Supported event: `sale.recorded`

```json
{
  "event": "sale.recorded",
  "payload": {
    "amount": 9,
    "platform": "Wix",
    "source": "Wix Store",
    "productName": "Shadow Work Starter Kit",
    "saleDate": "2026-05-17"
  }
}
```

Writes to Airtable Sales.

Keep `MM_AUTOMATION_WEBHOOK_SECRET` separate from `MM_DASHBOARD_TOKEN`. If a Zap/Scenario is shared or compromised, rotate only the webhook secret.
