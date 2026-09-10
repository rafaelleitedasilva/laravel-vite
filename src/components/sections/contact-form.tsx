"use client";

import { type FormEvent, useMemo, useState } from "react";
import { Send, Mail } from "lucide-react";
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactResult,
} from "@/lib/validation/contact";
import { Field, TextareaField } from "@/components/ui/field";
import { Button, buttonClass } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited:
    "Você enviou muitas mensagens em pouco tempo. Tente novamente em alguns minutos.",
  send_failed: "O envio automático está indisponível no momento.",
  spam_detected: "Não foi possível enviar a mensagem.",
  validation: "Revise os campos destacados.",
};

interface Draft {
  name: string;
  email: string;
  context: string;
  message: string;
}

const EMPTY_DRAFT: Draft = { name: "", email: "", context: "", message: "" };

function mailtoHref(to: string, d: Draft): string {
  const subject = d.context || "Contato pelo portfólio";
  const body = `${d.message}\n\n— ${d.name}${d.email ? ` (${d.email})` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const startedAt = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setErrors({});

    const form = event.currentTarget;
    const fd = new FormData(form);
    const values: Draft = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      context: String(fd.get("context") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setDraft(values);

    const parsed = contactSchema.safeParse({
      ...values,
      company: String(fd.get("company") ?? ""),
      startedAt,
    });
    if (!parsed.success) {
      const next: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (
          (key === "name" ||
            key === "email" ||
            key === "context" ||
            key === "message") &&
          !next[key]
        ) {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      setStatus("error");
      setFormError(ERROR_MESSAGES.validation ?? null);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json()) as ContactResult;

      if (body.ok) {
        setStatus("success");
        form.reset();
        setDraft(EMPTY_DRAFT);
        return;
      }

      if (body.error === "validation") setErrors(body.errors);
      setStatus("error");
      setFormError(ERROR_MESSAGES[body.error] ?? "Não foi possível enviar.");
    } catch {
      setStatus("error");
      setFormError(ERROR_MESSAGES.send_failed ?? "Não foi possível enviar.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-success/40 bg-success/10 p-6 text-sm"
      >
        <p className="font-medium text-text">Mensagem enviada. Obrigado pelo contato!</p>
        <p className="mt-1 text-text-dim">Respondo assim que possível.</p>
        <button
          type="button"
          className="mt-4 text-accent underline underline-offset-4"
          onClick={() => setStatus("idle")}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const showEmailFallback = status === "error" && formError !== ERROR_MESSAGES.validation;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" name="name" autoComplete="name" error={errors.name} />
        <Field
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <Field label="Assunto" name="context" error={errors.context} />
      <TextareaField label="Mensagem" name="message" error={errors.message} />

      {/* Honeypot — hidden from users and assistive tech. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Empresa (não preencher)</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status === "error" && formError ? (
          showEmailFallback ? (
            <div className="rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm">
              <p className="text-text">{formError}</p>
              <p className="mt-1 text-text-dim">
                Envie a mensagem direto pelo seu cliente de e-mail — os campos já vão
                preenchidos.
              </p>
              <a
                className={`${buttonClass("secondary", "sm")} mt-3`}
                href={mailtoHref(fallbackEmail, draft)}
              >
                <Mail className="size-4" aria-hidden="true" /> Abrir e-mail
              </a>
            </div>
          ) : (
            <p className="text-sm text-danger">{formError}</p>
          )
        ) : null}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        <Send className="size-4" aria-hidden="true" />
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </Button>
    </form>
  );
}
