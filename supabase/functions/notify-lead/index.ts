import { corsHeaders } from "@supabase/supabase-js/cors";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const FROM = "Corse Drone <noreply@corse-drone.com>";
const TO = ["contact@corse-drone.com"];

const REQUEST_TYPE_LABELS: Record<string, string> = {
  nettoyage: "Nettoyage par drone",
  diagnostic: "Diagnostic et inspection",
  agriculture: "Agriculture de précision",
  transport: "Transport aérien",
  "autre-expertise": "Autre expertise",
  partenariat: "Programme partenaires",
  autre: "Autre demande",
};

const POLE_LABELS: Record<string, string> = {
  nettoyage: "Nettoyage",
  diagnostic: "Diagnostic",
  agriculture: "Agriculture",
  transport: "Transport",
};

// In-memory rate limit (resets on cold start). 5 requests / 5 min / IP.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, arr);
    return true;
  }
  arr.push(now);
  ipHits.set(ip, arr);
  return false;
}

function fmtDateTime(d = new Date()) {
  const date = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "long",
  }).format(d);
  const heure = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    timeStyle: "short",
  }).format(d);
  return { date, heure };
}

const contactSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(40).optional().nullable(),
  requestType: z.string().max(50),
  message: z.string().min(1).max(5000),
});

const partnerSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(40),
  profession: z.string().max(200),
  message: z.string().min(1).max(5000),
});

const launchAlertSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional().nullable(),
  pole: z.string().max(50),
});

const bodySchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("contact"), payload: contactSchema }),
  z.object({ type: z.literal("partner"), payload: partnerSchema }),
  z.object({ type: z.literal("launch-alert"), payload: launchAlertSchema }),
]);

type Built = { subject: string; text: string; replyTo: string };

function buildContact(p: z.infer<typeof contactSchema>): Built {
  const { date, heure } = fmtDateTime();
  const typeLabel = REQUEST_TYPE_LABELS[p.requestType] || p.requestType;
  const tel = p.phone && p.phone.trim() ? p.phone.trim() : "Non renseigné";
  const subject = `Nouveau contact [${typeLabel}] - ${p.fullName}`;
  const text = `Bonjour,

Nouveau message via le formulaire de contact de corse-drone.com.

Type de demande : ${typeLabel}
Nom : ${p.fullName}
Email : ${p.email}
Téléphone : ${tel}

Message :
${p.message}

Reçu le ${date} à ${heure}.
`;
  return { subject, text, replyTo: p.email };
}

function buildPartner(p: z.infer<typeof partnerSchema>): Built {
  const { date, heure } = fmtDateTime();
  const subject = `Candidature partenaire - ${p.profession} - ${p.fullName}`;
  const text = `Bonjour,

Nouvelle candidature partenaire sur corse-drone.com.

Profession / Activité : ${p.profession}
Nom : ${p.fullName}
Email : ${p.email}
Téléphone : ${p.phone}

Message :
${p.message}

Reçue le ${date} à ${heure}.
`;
  return { subject, text, replyTo: p.email };
}

function buildLaunchAlert(p: z.infer<typeof launchAlertSchema>): Built {
  const { date, heure } = fmtDateTime();
  const poleLabel = POLE_LABELS[p.pole] || p.pole;
  const company = p.company && p.company.trim() ? p.company.trim() : null;
  const subject = `Nouvelle alerte lancement ${poleLabel} - ${p.email}`;
  const lines = [
    "Bonjour,",
    "",
    `Une personne s'est inscrite à l'alerte de lancement du pôle ${poleLabel} sur corse-drone.com.`,
    "",
    `Nom : ${p.name}`,
  ];
  if (company) lines.push(`Entreprise : ${company}`);
  lines.push(
    `Email : ${p.email}`,
    `Pôle concerné : ${poleLabel}`,
    "",
    `Inscrite le ${date} à ${heure}.`,
    "",
    "Pensez à la contacter dès que le pôle est lancé.",
    "",
  );
  return { subject, text: lines.join("\n"), replyTo: p.email };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const ok = (extra: Record<string, unknown> = {}) =>
    new Response(JSON.stringify({ ok: true, ...extra }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      console.warn(`notify-lead: rate limited ip=${ip}`);
      return ok({ skipped: "rate_limited" });
    }

    const json = await req.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      console.error("notify-lead: invalid body", parsed.error.flatten());
      return ok({ skipped: "invalid_body" });
    }

    let built: Built;
    if (parsed.data.type === "contact") built = buildContact(parsed.data.payload);
    else if (parsed.data.type === "partner") built = buildPartner(parsed.data.payload);
    else built = buildLaunchAlert(parsed.data.payload);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("notify-lead: missing API keys (LOVABLE_API_KEY or RESEND_API_KEY)");
      return ok({ skipped: "missing_keys" });
    }

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: built.replyTo,
        subject: built.subject,
        text: built.text,
      }),
    });

    const respText = await res.text();
    if (!res.ok) {
      console.error(`notify-lead: Resend error [${res.status}]: ${respText}`);
      return ok({ skipped: "send_failed", status: res.status });
    }

    console.log(`notify-lead: sent type=${parsed.data.type}`);
    return ok({ sent: true });
  } catch (err) {
    console.error("notify-lead: unexpected error", err);
    return ok({ skipped: "exception" });
  }
});
