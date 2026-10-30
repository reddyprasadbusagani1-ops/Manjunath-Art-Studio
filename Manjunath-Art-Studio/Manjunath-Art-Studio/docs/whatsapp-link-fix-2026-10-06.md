# WhatsApp link fix

No redesign. Only WhatsApp link behaviour and message wording change.

## What I found
- Every WhatsApp button already uses `https://wa.me/916309427452?text=...` with URL encoding and opens in a new tab. There are no `api.whatsapp.com` links in the code.
- The "refused to connect" error comes from wa.me itself forwarding to api.whatsapp.com, which WhatsApp does not allow to load inside the editor's preview frame. On the published site, or opened in a full browser tab, the links work.

## Changes
1. Update the three messages to the exact wording supplied (custom: "a reference or idea"; artwork: name in quotes).
2. Add one shared WhatsApp button helper: on click it calls `window.open(url, "_blank", "noopener,noreferrer")` so it always opens a new top-level tab instead of the preview frame; the normal link stays as fallback.
3. Apply it to all 9 places: navbar, hero, gallery Enquire buttons + photo viewer, Start a Custom Order, brief "Send on WhatsApp", contact button + contact row, floating mobile button, footer.
4. Search confirms zero `api.whatsapp.com` references.

## Checks
- Browser test desktop and mobile: click each WhatsApp button, confirm a new tab opens at wa.me with the correct message and artwork name; no console errors.
- Also fix the earlier phone sideways-scroll issue only if it is the top-bar WhatsApp button (part of the same buttons).

## Technical details
- `waLink` in `src/lib/site.ts` kept; new `openWhatsApp(e, url)` onClick handler.
