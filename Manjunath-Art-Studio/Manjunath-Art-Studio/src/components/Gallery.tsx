import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { getArtworks, MSG, waLink, type Category } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { ArtImage } from "./ArtImage";

const ARTWORKS = getArtworks();
const FILTERS: (Category | "all")[] = ["all", "devotional", "telugu", "temple", "mythological", "thanjavur", "custom"];

export function Gallery() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = filter === "all" ? ARTWORKS : ARTWORKS.filter((a) => a.categories.includes(filter));
  const touchX = useRef(0);

  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const cur = open !== null ? (list[open] ?? null) : null;

  return (
    <section id="artwork" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{t.gallery.label}</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-primary md:text-5xl">{t.gallery.h}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.gallery.desc}</p>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter artwork">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-11 border px-4 text-xs font-medium uppercase tracking-widest transition-colors ${
                filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-secondary hover:border-accent"
              }`}
            >
              {f === "all" ? t.gallery.all : t.cats[f]}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-12 border border-dashed border-border p-10 text-center text-muted-foreground">{t.gallery.empty}</p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <li key={a.id} className="group flex flex-col">
                <button onClick={() => setOpen(i)} className="relative block overflow-hidden border border-border bg-background p-3 shadow-frame" aria-label={`${a.name[lang]} — open`}>
                  <ArtImage src={a.image?.src} alt={a.name[lang]} label={t.gallery.photoSoon} className="relative aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                </button>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent">{a.categories.map((c) => t.cats[c]).join(" · ")}</p>
                    <h3 className="font-display mt-1 text-2xl text-primary">{a.name[lang]}</h3>
                    {a.displayPrice && <p className="font-display mt-1 text-xl font-semibold text-secondary">{a.displayPrice}</p>}
                    <p className="mt-1 text-xs text-muted-foreground">{t.gallery.available}</p>
                  </div>
                  <a href={waLink(MSG.artwork(a.name.en))} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-primary px-4 text-xs font-medium uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground">
                    {t.gallery.enquire}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="font-display mt-14 border-t border-border pt-6 text-center text-xl italic text-secondary">{t.gallery.pricing}</p>
      </div>

      {cur && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cur.name[lang]}
          className="fixed inset-0 z-[60] flex flex-col bg-primary/95 p-4 text-primary-foreground"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => {
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex justify-end">
            <button autoFocus onClick={() => setOpen(null)} aria-label={t.gallery.close} className="flex h-11 w-11 items-center justify-center hover:text-accent"><X /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center gap-2">
            <button onClick={() => move(-1)} aria-label={t.gallery.prev} className="flex h-11 w-11 items-center justify-center hover:text-accent"><ChevronLeft /></button>
            <ArtImage src={cur.image?.src} alt={cur.name[lang]} label={t.gallery.photoSoon} className="relative max-h-[70vh] w-full max-w-xl aspect-[4/5] object-contain" />
            <button onClick={() => move(1)} aria-label={t.gallery.next} className="flex h-11 w-11 items-center justify-center hover:text-accent"><ChevronRight /></button>
          </div>
          <div className="mx-auto mt-4 text-center">
            <p className="text-xs uppercase tracking-widest text-accent">{cur.categories.map((c) => t.cats[c]).join(" · ")}</p>
            <h3 className="font-display text-3xl">{cur.name[lang]}</h3>
            {cur.displayPrice && <p className="font-display mt-1 text-2xl font-semibold text-accent">{cur.displayPrice}</p>}
            <p className="mt-1 text-xs opacity-80">{t.gallery.available}</p>
            <a href={waLink(MSG.artwork(cur.name.en))} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 bg-accent px-6 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              <MessageCircle className="h-4 w-4" /> {t.cta}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
