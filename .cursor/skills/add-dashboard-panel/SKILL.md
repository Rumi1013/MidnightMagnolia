---
name: add-dashboard-panel
description: Add a new integration panel to /dashboard for Midnight Magnolia. Wires the full chain — Airtable getter → API route → React state → component → integration pill — following the established pattern in pages/dashboard.jsx. Use when the user asks to add a dashboard panel, surface a new Airtable table on the dashboard, or wire a new integration into the operations view.
---

# Add Dashboard Panel

## Pattern overview
Every dashboard panel follows the same 5-step wiring. Reference the existing `AirtableServices` panel as the canonical example.

```
1. Airtable getter        →  lib/airtable.js
2. API endpoint            →  pages/api/airtable/operations.js
3. React state + fetch     →  pages/dashboard.jsx (top of component)
4. Panel component         →  pages/dashboard.jsx (helper function)
5. Render slot + pill      →  pages/dashboard.jsx (JSX + integrations array)
```

## Step-by-step

### 1. Add the getter to `lib/airtable.js`
```js
export async function getNewThing({ filter = false } = {}) {
  const tableId = TBL.NEW_THING();
  if (!tableId) return null;            // signals "not connected"
  const records = await fetchTable(opsBase, tableId, {
    sort: [{ field: 'Priority', direction: 'asc' }],
  });
  return records.map(r => ({
    id:        r.id,
    name:      r.fields['Name']      ?? '',
    priority:  r.fields['Priority']  ?? '',
  }));
}
```

Also add to the `TBL` map:
```js
NEW_THING: () => process.env.AIRTABLE_TBL_NEW_THING || null,
```

### 2. Register in `pages/api/airtable/operations.js`
Add to the `TABLES` map:
```js
'new-thing': { get: getNewThing, update: updateNewThing },
```

### 3. Wire state + fetch in `pages/dashboard.jsx`
Add to the state block:
```jsx
const [atNewThing, setAtNewThing] = useState(undefined);
```

Add to the `Promise.allSettled` fetch:
```jsx
fetch('/api/airtable/operations?table=new-thing').then(r => r.json()).catch(() => ({ items: null })),
```

Wire the result (preserve order in `then(([...]) => ...)`):
```jsx
setAtNewThing(res[N].items ?? null);
```

### 4. Component (above the main `Dashboard` export)
```jsx
function AirtableNewThing({ items }) {
  if (items === null)    return <NotConnected name="New Thing" hint="Set AIRTABLE_TBL_NEW_THING in .env.local." />;
  if (!items.length)     return <EmptyPanel text="No rows yet." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(item => (
        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-md)', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
          <span style={{ fontSize: '0.87rem' }}>{item.name}</span>
          <span className="muted" style={{ fontSize: '0.72rem' }}>{item.priority}</span>
        </div>
      ))}
    </div>
  );
}
```

### 5. Render + pill
Add the panel to the dashboard JSX:
```jsx
<Section title="New Thing">
  <AirtableNewThing items={atNewThing} />
</Section>
```

Add an integration pill to the `integrations` array near the top:
```jsx
{ label: 'New Thing', state: atNewThing === null ? 'disconnected' : 'connected' }
```

### 6. Document in `.env.local.example`
```
# New Thing inventory — create the Airtable table, then paste its ID here
# AIRTABLE_TBL_NEW_THING=tblxxxxxxxxxxxxxx
```

## Three states the UI must handle
| State | Value | UI |
|---|---|---|
| Not configured | `null` | `<NotConnected />` — explain how to set up |
| Connected but empty | `[]` | `<EmptyPanel />` — explain how to add data |
| Has data | `[...items]` | Render rows |

This three-state contract is **load-bearing**. The dashboard relies on it for every panel.

## Verify after wiring
1. `npm run dev` and check `/dashboard` renders without 500
2. Check the integration pill shows the right state
3. Disconnect the env var to confirm the "Not Connected" state renders cleanly
4. Run `ReadLints` on `pages/dashboard.jsx` — most merge artifacts show up here first

## Reference
- Canonical example: `AirtableServices` component in `pages/dashboard.jsx`
- Three-state pattern: `airtable-conventions.mdc` rule
