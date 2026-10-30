# Manjunath Art Studio — Website Plan

A single-page website that follows your brief exactly: warm gallery look, WhatsApp as the main way to enquire, and an English / Telugu switch.

## Before launch: photos needed
No photos came with the brief. I'll build the site with neat "photo coming soon" frames in place of the 4 artworks and Manjunath's portrait (no stock or AI images, as you asked). Upload the 5 real photos any time and I'll put them in.

## Sections (top to bottom)
1. **Top menu** — logo, links (Home, About, Artwork, Custom Art, Process, Our Work, FAQ, Contact), EN / తెలుగు switch, "Enquire on WhatsApp" button. On phones this becomes a menu button.
2. **Main banner** — "Tradition on Canvas. Art from the Heart.", short description, Explore Artwork / Request Custom Art buttons, Punganur location, one artwork as the main picture.
3. **Three highlights** — Handmade, Traditional Inspiration, Custom Creations.
4. **Meet the Artist** — portrait and the exact story from the brief.
5. **Featured Artwork** — category filters, 4 artwork cards with an Enquire button each, click to view full screen with previous / next and WhatsApp enquiry. Includes the pricing note.
6. **Custom Art** — "Have an Idea for an Artwork?", the 6 art types, Start a Custom Order button.
7. **Process** — the 6 steps with icons, wording as written.
8. **Materials** — the 11 materials, clearly noted as varying by artwork, plus the framing note.
9. **Created With Care** — 4 points.
10. **Follow the Art Journey** — Instagram @Manju_artzs button (no fake posts).
11. **FAQ** — 7 questions that open and close.
12. **Contact** — WhatsApp, phone, email, Instagram, location, service area.
13. **Footer** — links, contact, © 2026.
- A WhatsApp button that stays at the bottom of the screen on phones.

## Rules followed
- All wording comes from the brief. No made-up prices, reviews, awards or titles. Thanjavur work is described honestly as "Thanjavur-inspired".
- Colours #F7F1E5, #3A2118, #B8892E, #6E4730, #2A211C, #FBF8F1. Fonts: Cormorant Garamond for headings, Inter for body text.
- Natural Telugu text for the menu, banner, about, categories, custom order, process, FAQ and contact.
- Works with a keyboard, has image descriptions, respects reduced-motion settings, and uses the browser title and description from the brief.

## Technical details
- The brief asks for plain HTML/CSS/JS. This project runs on React + TanStack Start, so I'll build it there as one page at `/`, split into small section components.
- `src/lib/site.ts` holds `WHATSAPP_NUMBER = "916309427452"`, the contacts and a `waLink(message)` helper that uses encodeURIComponent. The artwork list is in the same file.
- `src/lib/i18n.tsx` has a language context with EN/TE dictionaries, saved to localStorage after the page loads.
- Design colours go in `src/styles.css`; fonts load through a link in the page head. SEO tags go in the index route's head().
- Photos will use the asset pointer system once uploaded. Until then, a styled frame shows instead of a broken image.
- Save the brand and content rules to project memory.
