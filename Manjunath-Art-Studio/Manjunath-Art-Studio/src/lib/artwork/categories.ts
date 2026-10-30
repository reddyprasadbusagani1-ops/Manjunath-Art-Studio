import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  { id: "cat-devotional", slug: "devotional", name: { en: "Devotional", te: "భక్తి" }, sortOrder: 1 },
  { id: "cat-telugu", slug: "telugu", name: { en: "Telugu Traditional", te: "తెలుగు సాంప్రదాయ" }, sortOrder: 2 },
  { id: "cat-temple", slug: "temple", name: { en: "Temple", te: "ఆలయ" }, sortOrder: 3 },
  { id: "cat-mythological", slug: "mythological", name: { en: "Mythological", te: "పౌరాణిక" }, sortOrder: 4 },
  { id: "cat-thanjavur", slug: "thanjavur", name: { en: "Thanjavur-Inspired", te: "తంజావూరు స్ఫూర్తి" }, sortOrder: 5 },
  { id: "cat-custom", slug: "custom", name: { en: "Custom", te: "కస్టమ్" }, sortOrder: 6 },
];
