import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * IP rate limiter for POST /api/contact.
 *
 * Degrades gracefully: if Upstash env vars are absent (local dev, first deploy),
 * every request is allowed and a warning is logged once. See
 * PORTFOLIO_MODERNIZATION.md §9.1 / technical debt note.
 */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let limiter: Ratelimit | null = null;
let warned = false;

if (url && token) {
  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "ratelimit:contact",
    analytics: false,
  });
}

export async function checkRateLimit(identifier: string): Promise<boolean> {
  if (!limiter) {
    if (!warned) {
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set — /api/contact is NOT rate limited.",
      );
      warned = true;
    }
    return true;
  }
  const { success } = await limiter.limit(identifier);
  return success;
}
