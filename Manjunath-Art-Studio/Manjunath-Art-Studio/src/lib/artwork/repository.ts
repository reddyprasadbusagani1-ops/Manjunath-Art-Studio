/**
 * Single read API for artwork. Phase 3 swaps these bodies for database queries
 * (they may become async); the UI only depends on these functions.
 */
import { ARTWORK_RECORDS } from "./artworks";
import { ARTWORK_IMAGES } from "./images";
import { CATEGORIES } from "./categories";
import type { Artwork, ArtworkView } from "./types";

export const formatPrice = (rupees: number | null) =>
  rupees === null ? null : `₹${rupees.toLocaleString("en-IN")}`;

const toView = (a: Artwork): ArtworkView => {
  const imgs = ARTWORK_IMAGES.filter((i) => i.artworkId === a.id).sort((x, y) => x.sortOrder - y.sortOrder);
  return {
    ...a,
    image: imgs.find((i) => i.isPrimary) ?? imgs[0] ?? null,
    displayPrice: a.priceVisible ? formatPrice(a.price) : null,
  };
};

export function getArtworks(): ArtworkView[] {
  return ARTWORK_RECORDS.filter((a) => a.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toView);
}

export function getFeaturedArtwork(): ArtworkView | null {
  const list = getArtworks();
  return list.find((a) => a.featured) ?? list[0] ?? null;
}

export function getCategories() {
  return [...CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder);
}
