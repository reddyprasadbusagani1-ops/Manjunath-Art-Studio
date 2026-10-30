# Phase 2 — Artwork Data Architecture

Behind-the-scenes restructuring only. The website will look and behave exactly the same: same 8 paintings, prices, filters, cards, viewer and WhatsApp buttons.

## What changes
1. **New artwork data file** with the full approved structure: id, slug, name (EN/TE), description (EN/TE), price, priceVisible, categories, artworkType, style, materials, frame, dimensions, images, availability, featured, status, sortOrder, createdAt, updatedAt.
2. **Category list**: the existing six (Devotional, Telugu Traditional, Temple, Mythological, Thanjavur-Inspired, Custom) with English and Telugu labels, slug and order. The filter labels stay as they are now.
3. **Images kept separately** from the artwork details, each linked by artwork id, with the CDN address, alt text, primary flag and order. That makes Phase 4 (image storage) a simple swap.
4. **Migrate all 8 existing paintings** using the current names, Telugu names, categories, prices and the 4 descriptions you supplied. Anything not supplied (materials, frame, size, style, Telugu descriptions, type) stays empty, never guessed.
5. **One small data-access layer** (e.g. `getArtworks()`, `getFeaturedArtwork()`, `getCategories()`) that the gallery and main banner read from. In Phase 3 the inside of it can switch to the database without touching the page.
6. Gallery and main banner read from the new layer. No visual change.

## Not included
No database, login, admin panel, payments or new screens.

## Check after building
Browser comparison at desktop and phone, in English and Telugu: same 8 cards in the same order, same prices, filters, viewer next/prev, artwork names in WhatsApp messages, no console errors.

## Technical details
- `src/lib/artwork/types.ts`: `Artwork`, `ArtworkImage`, `Category`, `CategorySlug`, `LocalizedText`, `Availability` ("available" | "sold" | "on_request"), `Status` ("draft" | "published" | "archived"), `Dimensions | null`. `price: number | null` stored in rupees (2500) plus `currency: "INR"`, formatted with `en-IN` so it shows "₹2,500" as it does now. Nullable fields are explicit `null`, matching future Postgres columns (snake_case mapping noted for Phase 3).
- `src/lib/artwork/categories.ts`, `artworks.ts` (8 records, `status: "published"`, `availability: "available"`, `priceVisible: true`, `sortOrder` 1-8 in the current order, artwork-01 `featured: true` for the main banner, fixed ISO timestamps), `images.ts` (asset pointer imports moved here).
- `src/lib/artwork/repository.ts`: functions return only published, sortOrder-sorted items, and attach the primary image. They are sync now, and the signatures are written so they can become async/server functions later.
- `site.ts` keeps WhatsApp, contact and ARTIST_PHOTO, and re-exports `CategorySlug` as `Category` so i18n keys still work. `Gallery.tsx` and `index.tsx` change only field access (`name` instead of `title`, `formatPrice`, primary image src).
- Record the data-layer rule in AGENTS.md.

## Issues to address before Phase 3
- Telugu descriptions, materials, frames and sizes are missing for all paintings.
- Availability is assumed "available" for all paintings, as the site already says. Please confirm.
- Slugs will be generated from the English names. Final web addresses need confirming if artwork pages are planned.
