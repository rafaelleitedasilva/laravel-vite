import { Resend } from "resend";
import { escapeHtml } from "@/lib/utils";
import type { ContactInput } from "@/lib/validation/contact";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.CONTACT_FROM_EMAIL;
const to = process.env.CONTACT_TO_EMAIL;

const resend = apiKey ? new Resend(apiKey) : null;

function renderHtml(input: ContactInput): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const context = escapeHtml(input.context);
  const message = escapeHtml(input.message).replace(/\n/g, "<br>");
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#050506;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ececee">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#0e0f11;border:1px solid #24262b;border-radius:12px">
      <tr><td style="padding:24px">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#9a9ca2">Novo contato pelo portfólio</p>
        <h1 style="margin:0 0 16px;font-size:18px">${context}</h1>
        <p style="margin:0 0 4px"><strong>Nome:</strong> ${name}</p>
        <p style="margin:0 0 16px"><strong>E-mail:</strong> <a style="color:#c9ccd3" href="mailto:${email}">${email}</a></p>
        <div style="padding:16px;background:#050506;border:1px solid #24262b;border-radius:8px;line-height:1.6">${message}</div>
      </td></tr>
    </table>
  </body>
</html>`;
}

function renderText(input: ContactInput): string {
  return [
    `Novo contato pelo portfólio`,
    ``,
    `Assunto: ${input.context}`,
    `Nome: ${input.name}`,
    `E-mail: ${input.email}`,
    ``,
    input.message,
  ].join("\n");
}

/** Sends the contact email. Returns false when the provider is not configured or errors. */
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  if (!resend || !from || !to) {
    console.error(
      "[email] Missing RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL.",
    );
    return false;
  }

  const { data, error } = await resend.emails.send({
    from: `Portfólio <${from}>`,
    to: [to],
    replyTo: input.email,
    subject: `Contato — ${input.name}: ${input.context}`,
    html: renderHtml(input),
    text: renderText(input),
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return false;
  }
  return Boolean(data?.id);
}
