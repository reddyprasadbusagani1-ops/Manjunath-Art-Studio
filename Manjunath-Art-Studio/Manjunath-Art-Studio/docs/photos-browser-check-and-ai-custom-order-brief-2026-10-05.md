# Photos, browser check and AI custom-order brief

## 1. Add the real photos
- Replace the 5 "Photo coming soon" frames with the uploaded photos (portrait + 4 artworks), hosted on the CDN.
- Proposed titles and categories (please correct if wrong):
  - Artwork 1 — Sri Rama Pattabhishekam (Mythological, Thanjavur-inspired gold detailing) — also used as the main hero image
  - Artwork 2 — Sri Krishna with Consorts (Devotional)
  - Artwork 3 — Kaliya Mardana Krishna (Mythological)
  - Artwork 4 — Sri Vishnu on Garuda with Consorts (Temple-inspired)
- Telugu titles added for each. Portrait used in the About section.

## 2. Browser check (desktop 1280px + mobile 390px)
- Check header, menu open/close, language switch, gallery filters, photo viewer (open, next/prev, close, swipe), FAQ, WhatsApp links, sticky mobile button.
- Fix any overlap, overflow, cropping or tap-target problems found.

## 3. "Plan your custom artwork" brief helper
- New section next to Custom Artwork: a short form with Subject, Style, Occasion, Size (optional), Notes.
- "Create my brief" button sends notes to AI, which streams back a clear, polite custom-order brief (subject, style, colours/details, size, occasion, questions for the artist). No prices, timelines or promises invented.
- Buttons under the result: "Send this brief on WhatsApp" (pre-filled message to 916309427452) and "Copy".
- Works in English and Telugu (brief written in the chosen language).
- Friendly error messages for busy service / out of AI credits.

## Technical details
- Assets via `lovable-assets` pointers; `site.ts` ARTWORKS/ARTIST_PHOTO updated.
- Server route `src/routes/api/brief.ts` (streaming) using AI SDK `@ai-sdk/openai` `.responses("openai/gpt-6-astra")` through Lovable AI Gateway, `LOVABLE_API_KEY` provisioned; store:false, reasoning low/medium; input validated with zod and length-capped; no database needed.
- Client component `BriefHelper.tsx` streams text, supports Stop.
- Playwright QA at both viewports; record decisions in AGENTS.md and tasks in roadmap.md.
