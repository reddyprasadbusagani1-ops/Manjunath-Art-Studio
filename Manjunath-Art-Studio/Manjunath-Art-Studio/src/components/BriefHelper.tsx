import { useRef, useState } from "react";
import { Copy, MessageCircle, Sparkles, Square } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

const T = {
  en: {
    label: "Brief helper", h: "Plan your custom artwork",
    p: "Tell us your idea in your own words. We'll turn it into a clear brief you can send to Manjunath on WhatsApp.",
    subject: "Subject (e.g. Lord Venkateswara, family portrait)", style: "Style (e.g. Thanjavur-inspired, watercolour)",
    occasion: "Occasion (e.g. housewarming, gift)", size: "Size (optional)", notes: "Other notes (colours, references, details)",
    go: "Create my brief", stop: "Stop", busy: "Writing your brief…", send: "Send this brief on WhatsApp", copy: "Copy", copied: "Copied",
    note: "This brief is a starting point. Price and timeline are discussed directly with Manjunath.", need: "Please describe the subject first.",
  },
  te: {
    label: "బ్రీఫ్ సహాయకం", h: "మీ ప్రత్యేక కళాకృతిని ప్లాన్ చేయండి",
    p: "మీ ఆలోచనను మీ మాటల్లో చెప్పండి. దాన్ని WhatsApp ద్వారా మంజునాథ్‌కు పంపగల స్పష్టమైన వివరణగా మారుస్తాం.",
    subject: "విషయం (ఉదా. శ్రీ వేంకటేశ్వర స్వామి, కుటుంబ చిత్రం)", style: "శైలి (ఉదా. తంజావూరు ప్రేరిత, వాటర్‌కలర్)",
    occasion: "సందర్భం (ఉదా. గృహప్రవేశం, బహుమతి)", size: "పరిమాణం (ఐచ్ఛికం)", notes: "ఇతర వివరాలు (రంగులు, రిఫరెన్స్‌లు)",
    go: "నా బ్రీఫ్ తయారు చేయండి", stop: "ఆపు", busy: "మీ బ్రీఫ్ రాస్తున్నాం…", send: "ఈ బ్రీఫ్‌ను WhatsApp‌లో పంపండి", copy: "కాపీ", copied: "కాపీ అయింది",
    note: "ఇది ప్రారంభ వివరణ మాత్రమే. ధర, సమయం మంజునాథ్‌తో నేరుగా మాట్లాడతారు.", need: "దయచేసి ముందుగా విషయం తెలపండి.",
  },
};

const field = "w-full border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none";

export function BriefHelper() {
  const { lang } = useLang();
  const t = T[lang];
  const [f, setF] = useState({ subject: "", style: "", occasion: "", size: "", notes: "" });
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const ctl = useRef<AbortController | null>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (f.subject.trim().length < 2) return setErr(t.need);
    setErr(""); setOut(""); setLoading(true);
    const c = new AbortController(); ctl.current = c;
    try {
      const res = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, lang }), signal: c.signal });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        setErr(j.error ?? "Something went wrong. Please try again.");
        return;
      }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setOut((o) => o + dec.decode(value, { stream: true }));
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErr("Something went wrong. Please try again.");
    } finally { setLoading(false); ctl.current = null; }
  }

  const msg = `Hi Manjunath, I'd like a custom artwork. Here is my brief:\n\n${out.trim()}`;

  return (
    <section id="brief" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{t.label}</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-primary md:text-5xl">{t.h}</h2>
          <p className="mt-4 text-muted-foreground">{t.p}</p>
          <form onSubmit={submit} className="mt-8 space-y-3">
            <input aria-label={t.subject} placeholder={t.subject} value={f.subject} onChange={set("subject")} maxLength={300} className={field} />
            <input aria-label={t.style} placeholder={t.style} value={f.style} onChange={set("style")} maxLength={300} className={field} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input aria-label={t.occasion} placeholder={t.occasion} value={f.occasion} onChange={set("occasion")} maxLength={200} className={field} />
              <input aria-label={t.size} placeholder={t.size} value={f.size} onChange={set("size")} maxLength={100} className={field} />
            </div>
            <textarea aria-label={t.notes} placeholder={t.notes} value={f.notes} onChange={set("notes")} maxLength={1500} rows={4} className={field} />
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="inline-flex min-h-12 items-center gap-2 bg-primary px-7 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-secondary disabled:opacity-60">
                <Sparkles className="h-4 w-4" /> {loading ? t.busy : t.go}
              </button>
              {loading && (
                <button type="button" onClick={() => ctl.current?.abort()} className="inline-flex min-h-12 items-center gap-2 border border-primary px-5 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Square className="h-3 w-3" /> {t.stop}
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="border border-border bg-card p-6 shadow-frame" aria-live="polite">
          {out ? (
            <>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">{out}</pre>
              {!loading && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 bg-accent px-6 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                    <MessageCircle className="h-4 w-4" /> {t.send}
                  </a>
                  <button onClick={() => { navigator.clipboard.writeText(out.trim()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex min-h-12 items-center gap-2 border border-primary px-5 text-xs font-semibold uppercase tracking-widest text-primary">
                    <Copy className="h-4 w-4" /> {copied ? t.copied : t.copy}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="font-display flex h-full min-h-48 items-center justify-center text-center text-xl italic text-muted-foreground">{loading ? t.busy : t.note}</p>
          )}
          {out && <p className="mt-4 text-xs text-muted-foreground">{t.note}</p>}
        </div>
      </div>
    </section>
  );
}
