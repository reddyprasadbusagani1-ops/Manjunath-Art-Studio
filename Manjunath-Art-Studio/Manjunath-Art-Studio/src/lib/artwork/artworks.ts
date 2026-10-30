import type { Artwork, CategorySlug } from "./types";

const TS = "2026-10-01T00:00:00.000Z";

type Seed = Pick<Artwork, "slug" | "name" | "categories" | "price"> & { n: string; descEn?: string; featured?: boolean };

const make = (s: Seed, i: number): Artwork => ({
  id: `artwork-${s.n}`,
  slug: s.slug,
  name: s.name,
  description: s.descEn ? { en: s.descEn, te: null } : null,
  price: s.price,
  currency: "INR",
  priceVisible: true,
  categories: s.categories,
  artworkType: null,
  style: null,
  materials: [],
  frame: null,
  dimensions: null,
  images: [`img-${s.n}`],
  availability: "available",
  featured: s.featured ?? false,
  status: "published",
  sortOrder: i + 1,
  createdAt: TS,
  updatedAt: TS,
});

const c = (...x: CategorySlug[]) => x;

export const ARTWORK_RECORDS: Artwork[] = [
  { n: "01", slug: "sri-rama-pattabhishekam", name: { en: "Sri Rama Pattabhishekam", te: "శ్రీ రామ పట్టాభిషేకం" }, categories: c("thanjavur"), price: 2500, featured: true },
  { n: "02", slug: "sri-krishna-with-consorts", name: { en: "Sri Krishna with Consorts", te: "దేవేరులతో శ్రీ కృష్ణుడు" }, categories: c("devotional"), price: 2000 },
  { n: "03", slug: "kaliya-mardana-krishna", name: { en: "Kaliya Mardana Krishna", te: "కాళీయ మర్దన కృష్ణుడు" }, categories: c("mythological"), price: 1500 },
  { n: "04", slug: "sri-vishnu-on-garuda-with-consorts", name: { en: "Sri Vishnu on Garuda with Consorts", te: "గరుడ వాహనంపై శ్రీ విష్ణువు" }, categories: c("temple"), price: 2000 },
  { n: "05", slug: "nandi-traditional-line-art", name: { en: "Nandi – Traditional Line Art", te: "నంది – సాంప్రదాయ రేఖా చిత్రం" }, categories: c("devotional", "temple", "mythological"), price: 999, descEn: "A detailed traditional line-art depiction of Nandi, the sacred bull associated with Lord Shiva, created with intricate ornamental detailing." },
  { n: "06", slug: "peacock-traditional-colorful-art", name: { en: "Peacock – Traditional Colorful Art", te: "నెమలి – సాంప్రదాయ రంగుల కళ" }, categories: c("telugu", "temple"), price: 899, descEn: "A colorful traditional peacock artwork featuring vibrant colors and detailed decorative elements inspired by Indian traditional art." },
  { n: "07", slug: "peacock-traditional-pencil-line-art", name: { en: "Peacock – Traditional Pencil Line Art", te: "నెమలి – సాంప్రదాయ పెన్సిల్ రేఖా చిత్రం" }, categories: c("telugu", "temple"), price: 799, descEn: "A detailed traditional peacock line-art drawing featuring intricate ornamental patterns and flowing decorative forms." },
  { n: "08", slug: "lord-ganesha-traditional-devotional-art", name: { en: "Lord Ganesha – Traditional Devotional Art", te: "శ్రీ గణేశుడు – సాంప్రదాయ భక్తి కళ" }, categories: c("devotional", "mythological", "telugu"), price: 1099, descEn: "A colorful traditional devotional artwork of Lord Ganesha, featuring vibrant colors, detailed ornamentation and cultural motifs." },
].map(make);
