import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Brush, Sparkles, Lightbulb, MessageCircle, MessagesSquare, Receipt, BadgeCheck, Palette, Truck,
  Menu, X, MapPin, Phone, Mail, Instagram, Plus, Heart, Users, Hand,
} from "lucide-react";
import { LangProvider, useLang } from "@/lib/i18n";
import { getFeaturedArtwork, ARTIST_PHOTO, CONTACT, MSG, waLink, interceptWhatsAppClicks } from "@/lib/site";
import { ArtImage } from "@/components/ArtImage";
import { Gallery } from "@/components/Gallery";
import { BriefHelper } from "@/components/BriefHelper";

const TITLE = "Manjunath Art Studio | Traditional Indian Art";
const DESC =
  "Manjunath Art Studio showcases handmade devotional, traditional and mythological artwork inspired by Indian culture and Telugu traditions, with custom artwork enquiries available directly through WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: () => (
    <LangProvider>
      <Page />
    </LangProvider>
  ),
});

const NAV = ["home", "about", "artwork", "custom", "process", "work", "faq", "contact"] as const;
const label = "text-xs font-medium uppercase tracking-[0.3em] text-accent";
const h2 = "font-display mt-3 text-4xl font-semibold text-primary md:text-5xl";
const btnPrimary = "inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-7 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-secondary";
const btnOutline = "inline-flex min-h-12 items-center justify-center gap-2 border border-primary px-7 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground";

function Logo() {
  return (
    <a href="#home" className="font-display leading-none text-primary" aria-label="Manjunath Art Studio — home">
      <span className="block text-2xl font-bold tracking-[0.15em]">MANJUNATH</span>
      <span className="block text-[0.7rem] font-semibold tracking-[0.5em] text-accent">ART STUDIO</span>
    </a>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex border border-border text-xs" role="group" aria-label="Language">
      {(["en", "te"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`min-h-9 px-3 ${lang === l ? "bg-primary text-primary-foreground" : "text-secondary"}`}>
          {l === "en" ? "EN" : "తెలుగు"}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Logo />
        <nav className="hidden xl:block" aria-label="Main">
          <ul className="flex gap-6 text-sm text-secondary">
            {NAV.map((n) => (
              <li key={n}><a href={`#${n}`} className="hover:text-accent">{t.nav[n]}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-10 px-4 max-md:!hidden`}>
            <MessageCircle className="h-4 w-4" /> {t.cta}
          </a>
          <button className="flex h-11 w-11 items-center justify-center text-primary xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={t.menu}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-border bg-background xl:hidden" aria-label="Mobile">
          <ul className="mx-auto max-w-7xl px-5 py-4">
            {NAV.map((n) => (
              <li key={n}><a href={`#${n}`} onClick={() => setOpen(false)} className="font-display block py-3 text-2xl text-primary">{t.nav[n]}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const { t, lang } = useLang();
  const a = getFeaturedArtwork();
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className={label}>{t.hero.label}</p>
          <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            {t.hero.h1a}<br /><em className="font-normal text-secondary">{t.hero.h1b}</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{t.hero.desc}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#artwork" className={btnPrimary}>{t.hero.explore}</a>
            <a href={waLink(MSG.custom)} target="_blank" rel="noopener noreferrer" className={btnOutline}>{t.hero.request}</a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-secondary"><MapPin className="h-4 w-4 text-accent" /> {t.hero.location}</p>
        </div>
        <div className="group relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 border border-accent/50" aria-hidden />
          <div className="relative border-8 border-card bg-card shadow-frame">
            <ArtImage src={a?.image?.src} alt={a?.name[lang] ?? ""} label={t.gallery.photoSoon} className="relative aspect-[4/5] w-full transition-transform duration-[1500ms] group-hover:scale-[1.02]" />
          </div>
        </div>
      </div>
      <div className="border-y border-border bg-card">
        <ul className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3">
          {t.features.map(([h, p], i) => {
            const Icon = [Hand, Sparkles, Lightbulb][i] ?? Hand;
            return (
              <li key={h} className="flex gap-4">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">{h}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
<div className="absolute inset-0 border border-accent/50" aria-hidden />
          <ArtImage src={ARTIST_PHOTO} alt="Portrait of Manjunath, artist" label={t.about.photoSoon} className="relative aspect-[4/5] w-full shadow-frame" />
        </div>
        <div>
          <p className={label}>{t.about.label}</p>
          <h2 className={h2}>{t.about.h}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            {t.about.p.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Custom() {
  const { t } = useLang();
  return (
    <section id="custom" className="bg-primary py-24 text-primary-foreground">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <p className={label}>{t.custom.label}</p>
        <h2 className="font-display mt-3 text-4xl font-semibold md:text-5xl">{t.custom.h}</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed opacity-85">{t.custom.p}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {t.custom.types.map((ty) => (
            <li key={ty} className="border border-accent/40 px-4 py-4 text-xs font-semibold uppercase tracking-widest">{ty}</li>
          ))}
        </ul>
        <p className="font-display mt-6 text-lg italic text-accent">{t.custom.note}</p>
        <a href={waLink(MSG.custom)} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-12 items-center gap-2 bg-accent px-8 text-xs font-semibold uppercase tracking-widest text-accent-foreground hover:opacity-90">
          <MessageCircle className="h-4 w-4" /> {t.custom.cta}
        </a>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useLang();
  const icons = [MessageCircle, MessagesSquare, Receipt, BadgeCheck, Palette, Truck];
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className={label}>{t.process.label}</p>
        <h2 className={h2}>{t.process.h}</h2>
        <ol className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.process.steps.map(([h, p], i) => {
            const Icon = icons[i] ?? Hand;
            return (
              <li key={h} className="bg-background p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-accent">0{i + 1}</span>
                  <Icon className="h-6 w-6 text-secondary" aria-hidden />
                </div>
                <h3 className="font-display mt-4 text-2xl text-primary">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Materials() {
  const { t } = useLang();
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <p className={label}>{t.materials.label}</p>
        <h2 className={h2}>{t.materials.h}</h2>
        <p className="mt-4 text-muted-foreground">{t.materials.p}</p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {t.materials.list.map((m) => (
            <li key={m} className="border border-border bg-background px-5 py-2 font-display text-lg text-primary">{m}</li>
          ))}
        </ul>
        <p className="mt-8 text-sm italic text-secondary">{t.materials.vary}</p>
        <p className="mt-2 text-sm text-secondary">{t.materials.frame}</p>
      </div>
    </section>
  );
}

function Why() {
  const { t } = useLang();
  const icons = [Hand, Sparkles, Brush, Users];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className={`${h2} text-center`}>{t.why.h}</h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map(([h, p], i) => {
            const Icon = icons[i] ?? Hand;
            return (
              <li key={h} className="text-center">
                <div className="mx-auto flex h-14 w-14 rotate-45 items-center justify-center border border-accent">
                  <Icon className="h-5 w-5 -rotate-45 text-accent" aria-hidden />
                </div>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Insta() {
  const { t } = useLang();
  return (
    <section id="work" className="border-y border-border bg-muted py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className={label}>{t.insta.label}</p>
        <h2 className={h2}>{t.insta.h}</h2>
        <p className="mt-4 text-muted-foreground">{t.insta.p}</p>
        <p className="font-display mt-6 text-3xl text-secondary">@{CONTACT.instagram}</p>
        <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-8`}>
          <Instagram className="h-4 w-4" /> {t.insta.btn}
        </a>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className={label}>{t.faq.label}</p>
        <h2 className={h2}>{t.faq.h}</h2>
        <div className="mt-10 border-t border-border">
          {t.faq.items.map(([q, a]) => (
            <details key={q} className="group border-b border-border">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl text-primary">
                {q}
                <Plus className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="pb-5 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const items = [
    { icon: MessageCircle, k: t.contact.whatsapp, v: CONTACT.whatsappDisplay, href: waLink(MSG.general), ext: true },
    { icon: Phone, k: t.contact.phone, v: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    { icon: Mail, k: t.contact.email, v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Instagram, k: t.contact.instagram, v: `@${CONTACT.instagram}`, href: CONTACT.instagramUrl, ext: true },
    { icon: MapPin, k: t.contact.location, v: t.hero.location },
  ];
  return (
    <section id="contact" className="bg-card py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
        <div>
          <p className={label}>{t.contact.label}</p>
          <h2 className={h2}>{t.contact.h}</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{t.contact.p}</p>
          <p className="mt-4 text-sm text-secondary">{t.contact.area}</p>
          <a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-8`}>
            <MessageCircle className="h-4 w-4" /> {t.cta}
          </a>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {items.map(({ icon: Icon, k, v, href, ext }) => {
            const body = (
              <>
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <span className="w-28 text-xs uppercase tracking-widest text-muted-foreground">{k}</span>
                <span className="font-display text-xl text-primary break-all">{v}</span>
              </>
            );
            return (
              <li key={k}>
                {href ? (
                  <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-h-16 items-center gap-4 py-3 hover:text-accent">{body}</a>
                ) : (
                  <div className="flex min-h-16 items-center gap-4 py-3">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-primary pb-24 pt-16 text-primary-foreground md:pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.15em]">MANJUNATH</p>
            <p className="font-display text-xs font-semibold tracking-[0.5em] text-accent">ART STUDIO</p>
            <p className="font-display mt-4 text-lg italic opacity-80">{t.footer.tagline}</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm opacity-85">
            {NAV.map((n) => <li key={n}><a href={`#${n}`} className="hover:text-accent">{t.nav[n]}</a></li>)}
          </ul>
          <ul className="space-y-2 text-sm opacity-85">
            <li><a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">WhatsApp {CONTACT.whatsappDisplay}</a></li>
            <li><a href={`tel:${CONTACT.phone}`} className="hover:text-accent">{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-accent">{CONTACT.email}</a></li>
            <li><a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">@{CONTACT.instagram}</a></li>
          </ul>
        </div>
        <p className="mt-12 border-t border-primary-foreground/15 pt-6 text-xs opacity-70">{t.footer.rights}</p>
      </div>
    </footer>
  );
}

function Page() {
  const { t } = useLang();
  useEffect(() => interceptWhatsAppClicks(), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Gallery />
        <Custom />
        <BriefHelper />
        <Process />
        <Materials />
        <Why />
        <Insta />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" className="fixed inset-x-3 bottom-3 z-40 flex min-h-12 items-center justify-center gap-2 bg-primary text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-frame md:hidden">
        <Heart className="sr-only" /><MessageCircle className="h-4 w-4" /> {t.cta}
      </a>
    </>
  );
}
