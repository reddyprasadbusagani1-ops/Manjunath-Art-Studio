import artist from "@/assets/artist.jpg.asset.json";

export const WHATSAPP_NUMBER = "916309427452";

export const CONTACT = {
  whatsappDisplay: "+91 63094 27452",
  phone: "+916309738280",
  phoneDisplay: "+91 63097 38280",
  email: "24hr1a3093@gmail.com",
  instagram: "Manju_artzs",
  instagramUrl: "https://www.instagram.com/manju_artzs/",
};

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const MSG = {
  general: "Hi Manjunath, I visited your website and would like to know more about your artwork.",
  custom:
    "Hi Manjunath, I would like to discuss a custom artwork. I have a reference or idea that I would like to share.",
  artwork: (name: string) =>
    `Hi Manjunath, I saw your artwork "${name}" on your website and would like to know more about it.`,
};

export type { CategorySlug as Category, Artwork, ArtworkView } from "./artwork/types";
export { getArtworks, getFeaturedArtwork, getCategories, formatPrice } from "./artwork/repository";

export const ARTIST_PHOTO: string | undefined = artist.url;

/**
 * Opens any wa.me link in a new top-level tab. Never navigates the current page/frame:
 * with "noopener" window.open() always returns null, so there must be no same-tab fallback
 * (that fallback is what loaded api.whatsapp.com inside the page and got blocked).
 */
export function interceptWhatsAppClicks() {
  const handler = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[href^="https://wa.me/"]') as HTMLAnchorElement | null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    window.open(a.href, "_blank", "noopener,noreferrer");
  };
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
