# Wix Headless OAuth — allowed redirect URIs

Member login uses `/auth/callback` (rewritten from `/api/auth/callback` in `next.config.mjs`).

OAuth app: **Midnitemag** (`977ae287-172d-4cd1-9a46-42bcc3b5b863`) on Wix site `ad2ce561-4efa-4255-a998-9074ffc0de7b`.

## Exact Authorization redirect URIs to add

In Wix Dashboard → **Headless Settings** → OAuth app → **Allowed authorization redirect URIs**, add:

```
https://midnight-magnolia-latisha-vincent-waters-projects.vercel.app/auth/callback
https://midnight-magnolia-latisha-vincent-waters-projects.vercel.app/api/auth/callback
https://www.midnight-magnolia.com/auth/callback
https://www.midnight-magnolia.com/api/auth/callback
http://localhost:3000/auth/callback
http://localhost:3000/api/auth/callback
```

Also keep **Allowed redirect domains** for the Vercel host and `www.midnight-magnolia.com` (already present per AGENTS.md).

Docs: https://dev.wix.com/docs/go-headless/authentication/setup/allow-redirect-uris-and-domains

## Status

- [x] URI list documented for Midnitemag
- [ ] Operator confirms URIs saved in Wix Headless Settings (dashboard UI — not writable via this repo)
