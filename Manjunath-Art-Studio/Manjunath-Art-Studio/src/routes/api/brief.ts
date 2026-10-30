import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Input = z.object({
  subject: z.string().trim().min(2).max(300),
  style: z.string().trim().max(300).default(""),
  occasion: z.string().trim().max(200).default(""),
  size: z.string().trim().max(100).default(""),
  notes: z.string().trim().max(1500).default(""),
  lang: z.enum(["en", "te"]).default("en"),
});

const SYSTEM = `You help customers of Manjunath Art Studio (Punganur, Andhra Pradesh) — a handmade traditional, devotional and mythological Indian art studio — turn rough notes into a clear custom-order brief for the artist.
Write a concise brief with short headed sections: Subject, Style & Details, Colours, Size, Occasion & Purpose, Questions for the Artist.
Rules: use only what the customer gave; mark missing items as "To discuss". Never mention prices, delivery dates, guarantees or shipping. Call Thanjavur style "Thanjavur-inspired". Be respectful about deities. Plain text, no markdown symbols like ** or #. Under 220 words.`;

export const Route = createFileRoute("/api/brief")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Input.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Please describe the subject of your artwork." }, { status: 400 });
        const d = parsed.data;
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ error: "The brief helper isn't set up yet." }, { status: 500 });
        const user = `Language for the brief: ${d.lang === "te" ? "Telugu" : "English"}
Subject: ${d.subject}
Style: ${d.style || "-"}
Occasion: ${d.occasion || "-"}
Size: ${d.size || "-"}
Other notes: ${d.notes || "-"}`;

        let up: Response;
        try {
          up = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "X-Lovable-AIG-SDK": "fetch" },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              stream: true,
              store: false,
              reasoning: { effort: "low" },
              instructions: SYSTEM,
              input: [{ role: "user", content: user }],
            }),
          });
        } catch (e) {
          if ((e as Error).name === "AbortError") return new Response(null, { status: 499 });
          throw e;
        }
        if (!up.ok || !up.body) {
          const msg =
            up.status === 429 ? "The helper is busy right now. Please try again in a minute."
            : up.status === 402 || up.status === 403 ? "The brief helper is unavailable right now. Please message Manjunath on WhatsApp directly."
            : "Something went wrong creating your brief. Please try again.";
          return Response.json({ error: msg }, { status: up.status });
        }

        const dec = new TextDecoder();
        const enc = new TextEncoder();
        let buf = "";
        const out = up.body.pipeThrough(
          new TransformStream<Uint8Array, Uint8Array>({
            transform(chunk, ctl) {
              buf += dec.decode(chunk, { stream: true });
              const lines = buf.split("\n");
              buf = lines.pop() ?? "";
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                const data = line.slice(5).trim();
                if (!data || data === "[DONE]") continue;
                try {
                  const ev = JSON.parse(data);
                  if (ev.type === "response.output_text.delta" && ev.delta) ctl.enqueue(enc.encode(ev.delta));
                  if (ev.type === "response.refusal.delta" && ev.delta) ctl.enqueue(enc.encode(ev.delta));
                } catch { /* partial */ }
              }
            },
          }),
        );
        return new Response(out, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
      },
    },
  },
});
