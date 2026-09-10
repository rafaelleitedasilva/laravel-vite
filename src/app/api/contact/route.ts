import { NextResponse } from "next/server";
import {
  contactSchema,
  MIN_FILL_MS,
  type ContactFieldErrors,
  type ContactResult,
} from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email/send";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Reject cross-origin posts (basic CSRF hardening — no session cookies here). */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // some privacy setups strip Origin; other checks still apply
  try {
    const host = new URL(origin).host;
    const allowed = new Set<string>([new URL(SITE_URL).host]);
    if (process.env.VERCEL_URL) allowed.add(process.env.VERCEL_URL);
    if (process.env.NODE_ENV !== "production") {
      allowed.add("localhost:3000");
      allowed.add("localhost:3100");
    }
    return allowed.has(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function json(body: ContactResult, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return json({ ok: false, error: "spam_detected" }, 403);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "validation", errors: {} }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        (key === "name" ||
          key === "email" ||
          key === "context" ||
          key === "message") &&
        !errors[key]
      ) {
        errors[key] = issue.message;
      }
    }
    return json({ ok: false, error: "validation", errors }, 400);
  }

  const data = parsed.data;

  // Honeypot + time-trap.
  if (data.company && data.company.length > 0) {
    return json({ ok: false, error: "spam_detected" }, 422);
  }
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return json({ ok: false, error: "spam_detected" }, 422);
  }

  const allowed = await checkRateLimit(clientIp(req));
  if (!allowed) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const sent = await sendContactEmail(data);
  if (!sent) {
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
