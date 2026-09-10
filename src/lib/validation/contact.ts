import { z } from "zod";

/** Minimum time (ms) a human takes to fill the form. Faster => bot. */
export const MIN_FILL_MS = 2_000;

/**
 * Shared client + server schema for the contact form.
 * Field names match the legacy Laravel form (name / email / context / message).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Nome muito longo."),
  email: z.string().trim().email("E-mail inválido.").max(160),
  context: z
    .string()
    .trim()
    .min(3, "Informe um assunto.")
    .max(120, "Assunto muito longo."),
  message: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(3_000, "Mensagem muito longa."),
  // Honeypot — must stay empty. Real users never see this field.
  company: z.string().max(0).optional().default(""),
  // Timestamp (ms) captured when the form mounted.
  startedAt: z.number().int().positive().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "context" | "message", string>
>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation"; errors: ContactFieldErrors }
  | { ok: false; error: "spam_detected" }
  | { ok: false; error: "rate_limited" }
  | { ok: false; error: "send_failed" };
