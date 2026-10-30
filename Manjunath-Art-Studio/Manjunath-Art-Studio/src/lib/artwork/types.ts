/** Artwork data model. Shapes mirror future database tables (camelCase here, snake_case in Postgres). */

export type LocalizedText = { en: string; te: string | null };

export type CategorySlug = "devotional" | "telugu" | "temple" | "mythological" | "thanjavur" | "custom";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: { en: string; te: string };
  sortOrder: number;
}

export type Availability = "available" | "sold" | "on_request";
export type Status = "draft" | "published" | "archived";

export interface Dimensions {
  width: number;
  height: number;
  unit: "in" | "cm";
}

/** Image record kept separate from artwork info (future image-storage table). */
export interface ArtworkImage {
  id: string;
  artworkId: string;
  src: string;
  alt: LocalizedText;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Artwork {
  id: string;
  slug: string;
  name: LocalizedText & { te: string };
  description: LocalizedText | null;
  /** Whole rupees, exactly as supplied by the artist. */
  price: number | null;
  currency: "INR";
  priceVisible: boolean;
  categories: CategorySlug[];
  artworkType: string | null;
  style: string | null;
  materials: string[];
  frame: string | null;
  dimensions: Dimensions | null;
  /** Image ids; image records live in images.ts. */
  images: string[];
  availability: Availability;
  featured: boolean;
  status: Status;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Artwork joined with its primary image, as consumed by the UI. */
export interface ArtworkView extends Artwork {
  image: ArtworkImage | null;
  displayPrice: string | null;
}
